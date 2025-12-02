import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Text, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, Typography } from '../config/theme';
import { fetchAllRecords } from '../services/airtableService';
import { AIRTABLE_CONFIG } from '../config/airtable';

export default function BrowseHerbsScreen({ navigation }) {
  const [herbs, setHerbs] = useState([]);
  const [filteredHerbs, setFilteredHerbs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHerbs();
  }, []);

  useEffect(() => {
    filterHerbs();
  }, [searchQuery, herbs]);

  const loadHerbs = async () => {
    try {
      const herbsData = await fetchAllRecords(AIRTABLE_CONFIG.tables.herbs);
      const sorted = herbsData.sort((a, b) =>
        (a.Common_Name || '').localeCompare(b.Common_Name || '')
      );
      setHerbs(sorted);
      setFilteredHerbs(sorted);
    } catch (error) {
      console.error('Error loading herbs:', error);
      // Fallback to empty list
      setHerbs([]);
      setFilteredHerbs([]);
    } finally {
      setLoading(false);
    }
  };

  const filterHerbs = () => {
    if (!searchQuery.trim()) {
      setFilteredHerbs(herbs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = herbs.filter(herb =>
      (herb.Common_Name || '').toLowerCase().includes(query) ||
      (herb.Latin_Name || '').toLowerCase().includes(query)
    );
    setFilteredHerbs(filtered);
  };

  const handleHerbPress = (herb) => {
    navigation.navigate('HerbDetail', { herbName: herb.Common_Name });
  };

  const renderHerbItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleHerbPress(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <MaterialCommunityIcons
            name="leaf"
            size={28}
            color={BrandColors.skyBlue}
          />
          <View style={styles.herbInfo}>
            <Title style={styles.herbName}>{item.Common_Name}</Title>
            {item.Latin_Name && (
              <Text style={styles.latinName}>{item.Latin_Name}</Text>
            )}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={BrandColors.gray}
          />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BrandColors.skyBlue} />
        <Text style={styles.loadingText}>Loading herbs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search herbs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={BrandColors.navyBlue}
        />
        <Text style={styles.resultCount}>
          {filteredHerbs.length} {filteredHerbs.length === 1 ? 'herb' : 'herbs'}
        </Text>
      </View>

      <FlatList
        data={filteredHerbs}
        renderItem={renderHerbItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: BrandColors.cream,
  },
  searchBar: {
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  resultCount: {
    ...Typography.caption,
    marginTop: 8,
    marginLeft: 4,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 12,
    backgroundColor: BrandColors.white,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  herbInfo: {
    flex: 1,
    marginLeft: 16,
  },
  herbName: {
    ...Typography.subheader,
    fontSize: 18,
  },
  latinName: {
    ...Typography.caption,
    fontStyle: 'italic',
    marginTop: 2,
  },
});
