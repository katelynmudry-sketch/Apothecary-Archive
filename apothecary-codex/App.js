import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppTheme } from './src/config/theme';

export default function App() {
  // TODO: Connect to real subscription service (RevenueCat)
  const [isPremium, setIsPremium] = useState(false);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={AppTheme}>
        <AppNavigator isPremium={isPremium} />
        <StatusBar style="auto" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
