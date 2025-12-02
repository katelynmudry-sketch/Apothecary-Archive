import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Apothecary Codex Botanical Library Theme
// Inspired by old herbaria, botanical archives, and antique library books
export const BrandColors = {
  sageGreen: '#6B8E6B',      // Primary - Botanical Sage Green
  leatherBrown: '#8B6F47',   // Accent - Aged Leather Brown
  forestGreen: '#2C4A2C',    // Dark - Deep Forest Green
  parchment: '#F5F1E8',      // Background - Aged Parchment
  white: '#FFFFFF',
  black: '#000000',
  warmGray: '#5A5450',       // Warm charcoal for text
  lightTaupe: '#E8E4DD',     // Light warm neutral

  // Semantic colors
  premium: '#8B6F47',        // Leather brown for premium features
  lock: '#999999',           // Gray for locked content
};

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: BrandColors.sageGreen,
    secondary: BrandColors.leatherBrown,
    tertiary: BrandColors.forestGreen,
    background: BrandColors.parchment,
    surface: BrandColors.white,
    surfaceVariant: BrandColors.lightTaupe,
    onSurface: BrandColors.black,
    onSurfaceVariant: BrandColors.warmGray,
    outline: BrandColors.lightTaupe,
  },
  roundness: 12,
};

export const Typography = {
  header: {
    fontFamily: 'System', // In production: 'Playfair Display'
    fontSize: 24,
    fontWeight: '700',
    color: BrandColors.forestGreen,
  },
  subheader: {
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: '600',
    color: BrandColors.forestGreen,
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
    color: BrandColors.warmGray,
  },
  quote: {
    fontFamily: 'System',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'italic',
    color: BrandColors.forestGreen,
  },
};
