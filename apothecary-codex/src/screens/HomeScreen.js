import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, ActivityIndicator } from 'react-native-paper';
import { BrandColors, Typography } from '../config/theme';
import { fetchEmotions } from '../services/airtableService';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popular emotions to display as quick search chips
  const popularEmotions = [
    'Grief',
    'Depression',
    'Burnout',
    'Anxiety',
    'Memory',
    'Anger',
    'Insomnia',
  ];

  useEffect(() => {
    loadEmotions();
  }, []);

  const loadEmotions = async () => {
    try {
      const emotionData = await fetchEmotions();
      setEmotions(emotionData);
    } catch (error) {
      console.log('Using fallback emotions list');
      // Fallback to hardcoded emotions if API fails
      setEmotions(popularEmotions.map((name, index) => ({
        Emotion_Name: name,
        id: index,
      })));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { emotion: searchQuery });
    }
  };

  const handleEmotionChipPress = (emotion) => {
    navigation.navigate('SearchResults', { emotion });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.title}>Welcome to Apothecary Codex</Title>
          <Paragraph style={styles.subtitle}>
            Discover herbs through the wisdom of Renaissance herbalists
          </Paragraph>
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="How are you feeling?"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
          iconColor={BrandColors.forestGreen}
        />

        {/* Popular Searches */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Popular Searches</Title>
            {loading ? (
              <ActivityIndicator size="small" color={BrandColors.sageGreen} />
            ) : (
              <View style={styles.chipContainer}>
                {popularEmotions.map((emotion, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onPress={() => handleEmotionChipPress(emotion)}
                    style={styles.chip}
                    textStyle={styles.chipText}
                  >
                    {emotion}
                  </Chip>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        {/* About Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>How It Works</Title>
            <Paragraph style={styles.bodyText}>
              Search by emotion to discover herbs used by Nicholas Culpeper, John Gerard, and other Renaissance herbalists.
            </Paragraph>
            <Paragraph style={styles.bodyText}>
              Each herb includes historical quotes, modern applications, and traditional preparation methods.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Historical Context */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>📚 Our Sources</Title>
            <Paragraph style={styles.bodyText}>
              • <Title style={styles.inlineTitle}>Nicholas Culpeper</Title> - The Complete Herbal (1653)
            </Paragraph>
            <Paragraph style={styles.bodyText}>
              • <Title style={styles.inlineTitle}>John Gerard</Title> - The Herball (1597)
            </Paragraph>
            <Paragraph style={styles.bodyText}>
              • <Title style={styles.inlineTitle}>Pliny the Elder</Title> - Natural History (77 CE)
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.parchment,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    ...Typography.header,
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: BrandColors.warmGray,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  card: {
    marginBottom: 16,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  cardTitle: {
    ...Typography.subheader,
    marginBottom: 12,
  },
  bodyText: {
    ...Typography.body,
    marginBottom: 8,
    lineHeight: 24,
  },
  inlineTitle: {
    ...Typography.body,
    fontWeight: '600',
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: BrandColors.parchment,
    borderColor: BrandColors.sageGreen,
  },
  chipText: {
    color: BrandColors.forestGreen,
  },
});
