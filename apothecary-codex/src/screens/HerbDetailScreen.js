import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Chip,
  Text,
  Divider,
  Button,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, Typography } from '../config/theme';
import { getHerbDetails } from '../services/airtableService';

export default function HerbDetailScreen({ route, navigation }) {
  const { herbName } = route.params;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false); // TODO: Connect to real subscription

  useEffect(() => {
    loadHerbDetails();
  }, [herbName]);

  const loadHerbDetails = async () => {
    try {
      const herbRecords = await getHerbDetails(herbName);
      // Sort by year (oldest first)
      const sorted = herbRecords.sort((a, b) => {
        const yearA = a.Source?.[0]?.match(/\d{2,4}/)?.[0] || '9999';
        const yearB = b.Source?.[0]?.match(/\d{2,4}/)?.[0] || '9999';
        return parseInt(yearA) - parseInt(yearB);
      });
      setRecords(sorted);
    } catch (error) {
      console.error('Error loading herb details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSourceName = (record) => {
    if (typeof record.Source === 'string') return record.Source;
    if (Array.isArray(record.Source)) return record.Source[0];
    return 'Unknown Source';
  };

  const getStarRating = (record) => {
    if (!record.Star_Rating) return '';
    return typeof record.Star_Rating === 'string'
      ? record.Star_Rating
      : '⭐'.repeat(record.Star_Rating);
  };

  const canShowPlanetary = (record) => {
    return isPremium || record.Show_Planetary_Free === true;
  };

  const renderPremiumUpsell = () => (
    <Card style={[styles.card, styles.premiumCard]}>
      <Card.Content>
        <View style={styles.premiumHeader}>
          <MaterialCommunityIcons
            name="lock"
            size={32}
            color={BrandColors.goldenYellow}
          />
          <Title style={styles.premiumTitle}>Unlock Planetary Wisdom</Title>
        </View>
        <Paragraph style={styles.premiumText}>
          Discover why Renaissance herbalists associated {herbName} with specific planets and elements.
        </Paragraph>
        <Paragraph style={styles.premiumText}>
          Learn about energetic qualities, humoral effects, and planetary correspondences.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => {/* Navigate to subscription screen */}}
          style={styles.premiumButton}
          labelStyle={styles.premiumButtonLabel}
        >
          Upgrade to Premium - $2.99/month
        </Button>
      </Card.Content>
    </Card>
  );

  const renderSourceRecord = (record, index) => {
    const sourceName = getSourceName(record);
    const starRating = getStarRating(record);
    const showPlanetary = canShowPlanetary(record);

    return (
      <View key={record.id || index}>
        {index > 0 && <Divider style={styles.divider} />}

        <Card style={styles.sourceCard}>
          <Card.Content>
            {/* Source Header */}
            <View style={styles.sourceHeader}>
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={24}
                color={BrandColors.navyBlue}
              />
              <Title style={styles.sourceName}>{sourceName}</Title>
              {starRating && <Text style={styles.starRating}>{starRating}</Text>}
            </View>

            {record.Record_ID && (
              <Text style={styles.recordId}>Record: {record.Record_ID}</Text>
            )}

            {/* Historical Quote */}
            <View style={styles.quoteContainer}>
              <MaterialCommunityIcons
                name="format-quote-open"
                size={20}
                color={BrandColors.skyBlue}
              />
              <Paragraph style={styles.quote}>
                {record.Original_Quote}
              </Paragraph>
            </View>

            {/* Emotion Tags */}
            {record.Emotion_Tags && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>💚 Used for:</Text>
                <View style={styles.chipContainer}>
                  {record.Emotion_Tags.split(',').map((tag, i) => (
                    <Chip
                      key={i}
                      style={styles.emotionChip}
                      textStyle={styles.chipText}
                      mode="outlined"
                    >
                      {tag.trim()}
                    </Chip>
                  ))}
                </View>
              </View>
            )}

            {/* Modern Application */}
            {record.Modern_Application && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>🌿 Modern Context:</Text>
                <Paragraph style={styles.bodyText}>
                  {record.Modern_Application}
                </Paragraph>
              </View>
            )}

            {/* Preparation Methods */}
            {record.Preparation_Methods && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>📖 Preparation:</Text>
                <Paragraph style={styles.bodyText}>
                  {record.Preparation_Methods}
                </Paragraph>
              </View>
            )}

            {/* Planetary Information (Premium or Show_Planetary_Free) */}
            {showPlanetary && record.Planetary_Ruler && (
              <View style={[styles.section, styles.planetarySection]}>
                <Text style={styles.sectionLabel}>🪐 Planetary Ruler:</Text>
                <Text style={styles.planetaryText}>
                  {record.Planetary_Ruler}
                </Text>
                {record.Elemental_Quality && (
                  <Text style={styles.bodyText}>
                    {record.Elemental_Quality}
                  </Text>
                )}
              </View>
            )}
          </Card.Content>
        </Card>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BrandColors.skyBlue} />
        <Text style={styles.loadingText}>Loading herb details...</Text>
      </View>
    );
  }

  if (records.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="leaf-off"
          size={64}
          color={BrandColors.gray}
        />
        <Title style={styles.emptyTitle}>No details found</Title>
        <Paragraph style={styles.emptyText}>
          Could not find information for {herbName}.
        </Paragraph>
      </View>
    );
  }

  const hasPlanetaryContent = records.some(r => r.Planetary_Ruler);
  const showUpsell = !isPremium && hasPlanetaryContent;

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons
              name="leaf"
              size={48}
              color={BrandColors.skyBlue}
            />
            <View style={styles.headerText}>
              <Title style={styles.herbTitle}>{herbName}</Title>
              <Text style={styles.sourceCount}>
                {records.length} {records.length === 1 ? 'source' : 'sources'}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Source Records */}
      <View style={styles.sourcesContainer}>
        <Title style={styles.sectionTitle}>📚 Historical Sources</Title>
        {records.map((record, index) => renderSourceRecord(record, index))}
      </View>

      {/* Premium Upsell */}
      {showUpsell && renderPremiumUpsell()}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.cream,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.cream,
  },
  loadingText: {
    ...Typography.body,
    marginTop: 16,
    color: BrandColors.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.cream,
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
    color: BrandColors.gray,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: BrandColors.white,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  herbTitle: {
    ...Typography.header,
    fontSize: 24,
  },
  sourceCount: {
    ...Typography.caption,
    marginTop: 4,
  },
  sourcesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    ...Typography.subheader,
    marginBottom: 16,
  },
  sourceCard: {
    marginBottom: 16,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceName: {
    ...Typography.subheader,
    fontSize: 18,
    marginLeft: 8,
    flex: 1,
  },
  starRating: {
    fontSize: 16,
  },
  recordId: {
    ...Typography.caption,
    marginBottom: 12,
  },
  quoteContainer: {
    flexDirection: 'row',
    backgroundColor: BrandColors.cream,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  quote: {
    ...Typography.quote,
    flex: 1,
    marginLeft: 8,
    lineHeight: 22,
  },
  section: {
    marginTop: 12,
  },
  sectionLabel: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 8,
  },
  bodyText: {
    ...Typography.body,
    lineHeight: 22,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: BrandColors.white,
    borderColor: BrandColors.skyBlue,
  },
  chipText: {
    ...Typography.caption,
    color: BrandColors.navyBlue,
  },
  planetarySection: {
    backgroundColor: BrandColors.cream,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: BrandColors.goldenYellow,
  },
  planetaryText: {
    ...Typography.body,
    fontWeight: '600',
    fontSize: 18,
    color: BrandColors.navyBlue,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: BrandColors.lightGray,
  },
  card: {
    margin: 16,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  premiumCard: {
    borderWidth: 2,
    borderColor: BrandColors.goldenYellow,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    ...Typography.subheader,
    marginLeft: 12,
    color: BrandColors.navyBlue,
  },
  premiumText: {
    ...Typography.body,
    marginBottom: 12,
    lineHeight: 22,
  },
  premiumButton: {
    marginTop: 8,
    backgroundColor: BrandColors.goldenYellow,
  },
  premiumButtonLabel: {
    color: BrandColors.navyBlue,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 32,
  },
});
