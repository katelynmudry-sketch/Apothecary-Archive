import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors, Typography } from '../config/theme';

export default function FavoritesScreen() {
  // TODO: Implement favorites functionality with AsyncStorage or SQLite

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="heart-outline"
        size={64}
        color={BrandColors.warmGray}
      />
      <Title style={styles.title}>No Favorites Yet</Title>
      <Paragraph style={styles.text}>
        Tap the heart icon on any herb to save it here for quick access.
      </Paragraph>
      <Paragraph style={styles.comingSoon}>
        Coming soon!
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColors.parchment,
    padding: 32,
  },
  title: {
    ...Typography.subheader,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    ...Typography.body,
    textAlign: 'center',
    color: BrandColors.warmGray,
    marginBottom: 16,
  },
  comingSoon: {
    ...Typography.caption,
    fontStyle: 'italic',
    color: BrandColors.sageGreen,
  },
});
