import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Chip, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, Typography } from '../config/theme';
import { searchByEmotion } from '../services/airtableService';

export default function SearchResultsScreen({ route, navigation }) {
  const { emotion } = route.params;
  const [results, setResults] = useState([]);
  const [groupedResults, setGroupedResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSearchResults();
  }, [emotion]);

  const loadSearchResults = async () => {
    try {
      const records = await searchByEmotion(emotion);

      // Group by herb name and count sources
      const herbMap = {};
      records.forEach(record => {
        const herbName = typeof record.Herb === 'string'
          ? record.Herb
          : record.Herb?.[0] || 'Unknown';

        if (!herbMap[herbName]) {
          herbMap[herbName] = {
            herbName,
            records: [],
            sourceCount: 0,
            starRating: '',
            preview: '',
          };
        }

        herbMap[herbName].records.push(record);

        // Track unique sources
        const sources = new Set();
        herbMap[herbName].records.forEach(r => {
          const source = typeof r.Source === 'string' ? r.Source : r.Source?.[0];
          if (source) sources.add(source);
        });
        herbMap[herbName].sourceCount = sources.size;

        // Get highest star rating
        const stars = herbMap[herbName].records.map(r =>
          (r.Star_Rating || '').length
        );
        herbMap[herbName].starRating = '⭐'.repeat(Math.max(...stars));

        // Use first quote as preview
        if (!herbMap[herbName].preview) {
          herbMap[herbName].preview = record.Original_Quote || '';
        }
      });

      // Convert to array and sort by star rating, then source count
      const grouped = Object.values(herbMap).sort((a, b) => {
        const starDiff = b.starRating.length - a.starRating.length;
        if (starDiff !== 0) return starDiff;
        return b.sourceCount - a.sourceCount;
      });

      setGroupedResults(grouped);
      setResults(records);
    } catch (error) {
      console.error('Error loading search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHerbPress = (herbName) => {
    navigation.navigate('HerbDetail', { herbName });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BrandColors.sageGreen} />
        <Text style={styles.loadingText}>Searching ancient texts...</Text>
      </View>
    );
  }

  if (groupedResults.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="book-search"
          size={64}
          color={BrandColors.warmGray}
        />
        <Title style={styles.emptyTitle}>No herbs found</Title>
        <Paragraph style={styles.emptyText}>
          No herbs were historically used for "{emotion}".
        </Paragraph>
        <Paragraph style={styles.emptyText}>
          Try searching for a different emotion or symptom.
        </Paragraph>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.resultCount}>
          {groupedResults.length} {groupedResults.length === 1 ? 'herb' : 'herbs'} found for "{emotion}"
        </Title>
      </View>

      {groupedResults.map((result, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleHerbPress(result.herbName)}
          activeOpacity={0.7}
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View style={styles.herbNameContainer}>
                  <MaterialCommunityIcons
                    name="leaf"
                    size={24}
                    color={BrandColors.sageGreen}
                  />
                  <Title style={styles.herbName}>{result.herbName}</Title>
                </View>
                <Text style={styles.starRating}>{result.starRating}</Text>
              </View>

              <View style={styles.metaContainer}>
                <Chip
                  icon="book-open-variant"
                  style={styles.sourceChip}
                  textStyle={styles.sourceChipText}
                  mode="outlined"
                >
                  {result.sourceCount} {result.sourceCount === 1 ? 'source' : 'sources'}
                </Chip>
              </View>

              <Paragraph
                style={styles.preview}
                numberOfLines={3}
              >
                "{result.preview.substring(0, 150)}..."
              </Paragraph>

              <View style={styles.footer}>
                <Text style={styles.viewMore}>
                  View full profile →
                </Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.parchment,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.parchment,
  },
  loadingText: {
    ...Typography.body,
    marginTop: 16,
    color: BrandColors.warmGray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.parchment,
    padding: 32,
  },
  emptyTitle: {
    ...Typography.subheader,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    ...Typography.body,
    textAlign: 'center',
    color: BrandColors.warmGray,
    marginBottom: 8,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  resultCount: {
    ...Typography.subheader,
    fontSize: 16,
    color: BrandColors.warmGray,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  herbNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  herbName: {
    ...Typography.subheader,
    marginLeft: 8,
    flex: 1,
  },
  starRating: {
    fontSize: 18,
    marginLeft: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sourceChip: {
    backgroundColor: BrandColors.parchment,
    borderColor: BrandColors.sageGreen,
  },
  sourceChipText: {
    ...Typography.caption,
    color: BrandColors.forestGreen,
  },
  preview: {
    ...Typography.quote,
    lineHeight: 22,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewMore: {
    ...Typography.body,
    color: BrandColors.sageGreen,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 32,
  },
});
