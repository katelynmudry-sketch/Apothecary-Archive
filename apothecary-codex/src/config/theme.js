import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Apothecary Codex Brand Colors from Solarium logo
export const BrandColors = {
  skyBlue: '#87CEEB',      // Primary - Sky Blue
  goldenYellow: '#FFD700', // Accent - Golden Yellow
  navyBlue: '#000080',     // Dark - Navy Blue
  cream: '#FFFDD0',        // Background - Cream
  white: '#FFFFFF',
  black: '#000000',
  gray: '#666666',
  lightGray: '#E5E5E5',

  // Semantic colors
  premium: '#FFD700',      // Golden for premium features
  lock: '#999999',         // Gray for locked content
};

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: BrandColors.skyBlue,
    secondary: BrandColors.goldenYellow,
    tertiary: BrandColors.navyBlue,
    background: BrandColors.cream,
    surface: BrandColors.white,
    surfaceVariant: BrandColors.lightGray,
    onSurface: BrandColors.black,
    onSurfaceVariant: BrandColors.gray,
    outline: BrandColors.lightGray,
  },
  roundness: 12,
};

export const Typography = {
  header: {
    fontFamily: 'System', // In production: 'Playfair Display'
    fontSize: 24,
    fontWeight: '700',
    color: BrandColors.navyBlue,
  },
  subheader: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '600',
    color: BrandColors.navyBlue,
  },
  body: {
    fontFamily: 'System', // In production: 'Source Sans Pro'
    fontSize: 16,
    fontWeight: '400',
    color: BrandColors.black,
  },
  caption: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    color: BrandColors.gray,
  },
  quote: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic',
    color: BrandColors.navyBlue,
  },
};
