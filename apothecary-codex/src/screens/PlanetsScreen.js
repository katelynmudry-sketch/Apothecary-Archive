import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, Typography } from '../config/theme';
import { fetchPlanets } from '../services/airtableService';

export default function PlanetsScreen({ navigation }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlanets();
  }, []);

  const loadPlanets = async () => {
    try {
      const planetsData = await fetchPlanets();
      // Sort by Planet_ID
      const sorted = planetsData.sort((a, b) =>
        (a.Planet_ID || 0) - (b.Planet_ID || 0)
      );
      setPlanets(sorted);
    } catch (error) {
      console.error('Error loading planets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanetPress = (planet) => {
    navigation.navigate('PlanetDetail', {
      planetName: planet.Planet_Name,
      planetData: planet,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BrandColors.sageGreen} />
        <Text style={styles.loadingText}>Loading planetary wisdom...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>🪐 Browse by Planet</Title>
        <Paragraph style={styles.headerSubtitle}>
          Explore herbs through their planetary rulers and energetic qualities
        </Paragraph>
      </View>

      {planets.map((planet) => (
        <TouchableOpacity
          key={planet.id}
          onPress={() => handlePlanetPress(planet)}
          activeOpacity={0.7}
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.planetSymbol}>{planet.Symbol || '🪐'}</Text>
                <View style={styles.planetInfo}>
                  <Title style={styles.planetName}>
                    {planet.Planet_Name}
                  </Title>
                  {planet.Qualities && (
                    <Text style={styles.qualities}>{planet.Qualities}</Text>
                  )}
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={BrandColors.warmGray}
                />
              </View>

              <View style={styles.attributesContainer}>
                {planet.Temperature && (
                  <Text style={styles.attribute}>
                    🌡️ {planet.Temperature}
                  </Text>
                )}
                {planet.Moisture && (
                  <Text style={styles.attribute}>
                    💧 {planet.Moisture}
                  </Text>
                )}
              </View>

              {planet.Emotional_Patterns && (
                <Paragraph style={styles.description} numberOfLines={2}>
                  {planet.Emotional_Patterns}
                </Paragraph>
              )}
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
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    ...Typography.header,
    marginBottom: 8,
  },
  headerSubtitle: {
    ...Typography.body,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  planetSymbol: {
    fontSize: 36,
    marginRight: 16,
  },
  planetInfo: {
    flex: 1,
  },
  planetName: {
    ...Typography.subheader,
    fontSize: 20,
  },
  qualities: {
    ...Typography.caption,
    marginTop: 2,
  },
  attributesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  attribute: {
    ...Typography.caption,
    marginRight: 16,
    fontWeight: '600',
  },
  description: {
    ...Typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 32,
  },
});
