import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandColors } from '../config/theme';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import HerbDetailScreen from '../screens/HerbDetailScreen';
import BrowseHerbsScreen from '../screens/BrowseHerbsScreen';
import PlanetsScreen from '../screens/PlanetsScreen';
import PlanetDetailScreen from '../screens/PlanetDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const BrowseStack = createNativeStackNavigator();
const PlanetsStack = createNativeStackNavigator();

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: BrandColors.cream,
        },
        headerTintColor: BrandColors.navyBlue,
      }}
    >
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'Apothecary Codex' }}
      />
      <HomeStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={({ route }) => ({ title: route.params?.emotion || 'Results' })}
      />
      <HomeStack.Screen
        name="HerbDetail"
        component={HerbDetailScreen}
        options={({ route }) => ({ title: route.params?.herbName || 'Herb' })}
      />
    </HomeStack.Navigator>
  );
}

// Browse Stack Navigator
function BrowseStackNavigator() {
  return (
    <BrowseStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: BrandColors.cream,
        },
        headerTintColor: BrandColors.navyBlue,
      }}
    >
      <BrowseStack.Screen
        name="BrowseMain"
        component={BrowseHerbsScreen}
        options={{ title: 'Browse Herbs' }}
      />
      <BrowseStack.Screen
        name="HerbDetail"
        component={HerbDetailScreen}
        options={({ route }) => ({ title: route.params?.herbName || 'Herb' })}
      />
    </BrowseStack.Navigator>
  );
}

// Planets Stack Navigator (Premium)
function PlanetsStackNavigator() {
  return (
    <PlanetsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: BrandColors.cream,
        },
        headerTintColor: BrandColors.navyBlue,
      }}
    >
      <PlanetsStack.Screen
        name="PlanetsMain"
        component={PlanetsScreen}
        options={{ title: 'Planets' }}
      />
      <PlanetsStack.Screen
        name="PlanetDetail"
        component={PlanetDetailScreen}
        options={({ route }) => ({ title: route.params?.planetName || 'Planet' })}
      />
      <PlanetsStack.Screen
        name="HerbDetail"
        component={HerbDetailScreen}
        options={({ route }) => ({ title: route.params?.herbName || 'Herb' })}
      />
    </PlanetsStack.Navigator>
  );
}

// Main Tab Navigator
function TabNavigator({ isPremium = false }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: BrandColors.navyBlue,
        tabBarInactiveTintColor: BrandColors.gray,
        tabBarStyle: {
          backgroundColor: BrandColors.cream,
          borderTopColor: BrandColors.lightGray,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseStackNavigator}
        options={{
          tabBarLabel: 'Herbs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: BrandColors.cream,
          },
          headerTintColor: BrandColors.navyBlue,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: BrandColors.cream,
          },
          headerTintColor: BrandColors.navyBlue,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator({ isPremium = false }) {
  return (
    <NavigationContainer>
      <TabNavigator isPremium={isPremium} />
    </NavigationContainer>
  );
}
