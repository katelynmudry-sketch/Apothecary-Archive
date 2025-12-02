import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, Typography } from '../config/theme';
import { getHerbsByPlanet } from '../services/airtableService';

export default function PlanetDetailScreen({ route, navigation }) {
  const { planetName, planetData } = route.params;
  const [herbs, setHerbs] = useState([]);
  const [groupedHerbs, setGroupedHerbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlanetHerbs();
  }, [planetName]);

  const loadPlanetHerbs = async () => {
    try {
      const records = await getHerbsByPlanet(planetName);

      // Group by herb name
      const herbMap = {};
      records.forEach(record => {
        const herbName = typeof record.Herb === 'string'
          ? record.Herb
          : record.Herb?.[0] || 'Unknown';

        if (!herbMap[herbName]) {
          herbMap[herbName] = {
            herbName,
            quotes: [],
          };
        }

        if (record.Original_Quote) {
          herbMap[herbName].quotes.push(record.Original_Quote);
        }
      });

      const grouped = Object.values(herbMap).sort((a, b) =>
        a.herbName.localeCompare(b.herbName)
      );

      setGroupedHerbs(grouped);
      setHerbs(records);
    } catch (error) {
      console.error('Error loading planet herbs:', error);
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
        <Text style={styles.loadingText}>Loading {planetName} herbs...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Planet Info Card */}
      {planetData && (
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Text style={styles.planetSymbol}>{planetData.Symbol || '🪐'}</Text>
              <View style={styles.headerText}>
                <Title style={styles.planetTitle}>{planetData.Planet_Name}</Title>
                {planetData.Element && (
                  <Text style={styles.attribute}>Element: {planetData.Element}</Text>
                )}
                {planetData.Temperature && (
                  <Text style={styles.attribute}>
                    {planetData.Temperature}, {planetData.Moisture}
                  </Text>
                )}
              </View>
            </View>

            {planetData.Qualities && (
              <View style={styles.qualitiesSection}>
                <Text style={styles.sectionLabel}>Qualities:</Text>
                <Paragraph style={styles.bodyText}>{planetData.Qualities}</Paragraph>
              </View>
            )}

            {planetData.Emotional_Patterns && (
              <View style={styles.qualitiesSection}>
                <Text style={styles.sectionLabel}>Emotional Patterns:</Text>
                <Paragraph style={styles.bodyText}>
                  {planetData.Emotional_Patterns}
                </Paragraph>
              </View>
            )}
          </Card.Content>
        </Card>
      )}

      {/* Herbs List */}
      <View style={styles.herbsContainer}>
        <Title style={styles.sectionTitle}>
          🌿 {planetName} Herbs ({groupedHerbs.length})
        </Title>

        {groupedHerbs.map((herb, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleHerbPress(herb.herbName)}
            activeOpacity={0.7}
          >
            <Card style={styles.herbCard}>
              <Card.Content>
                <View style={styles.herbHeader}>
                  <MaterialCommunityIcons
                    name="leaf"
                    size={24}
                    color={BrandColors.sageGreen}
                  />
                  <Title style={styles.herbName}>{herb.herbName}</Title>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={BrandColors.warmGray}
                  />
                </View>
                {herb.quotes.length > 0 && (
                  <Paragraph style={styles.quote} numberOfLines={2}>
                    "{herb.quotes[0].substring(0, 120)}..."
                  </Paragraph>
                )}
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

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
  headerCard: {
    margin: 16,
    backgroundColor: BrandColors.white,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planetSymbol: {
    fontSize: 48,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  planetTitle: {
    ...Typography.header,
    fontSize: 24,
  },
  attribute: {
    ...Typography.caption,
    marginTop: 2,
  },
  qualitiesSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: BrandColors.lightTaupe,
  },
  sectionLabel: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  bodyText: {
    ...Typography.body,
    lineHeight: 22,
  },
  herbsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    ...Typography.subheader,
    marginBottom: 16,
  },
  herbCard: {
    marginBottom: 12,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  herbHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  herbName: {
    ...Typography.subheader,
    fontSize: 18,
    marginLeft: 12,
    flex: 1,
  },
  quote: {
    ...Typography.quote,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 32,
  },
});
