# Apothecary Codex 🌿

An emotion-first herbal database featuring Renaissance herbalists.

## Features

- 🔍 **Emotion Search**: Find herbs by searching emotional states
- 📚 **Historical Sources**: Quotes from Culpeper (1653), Gerard (1597), and Pliny (77 CE)
- 🌿 **58 Herbs**: Comprehensive herb profiles with multi-source citations
- 🪐 **Premium Planetary Content**: Browse herbs by planetary rulers
- 💾 **Offline Support**: Access data without internet connection

## Tech Stack

- **Framework**: React Native (Expo)
- **UI Library**: React Native Paper
- **Navigation**: React Navigation
- **Database**: Airtable (with offline SQLite caching)
- **State Management**: React Context

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Airtable account with API key

### Installation

1. **Clone the repository**
   ```bash
   cd apothecary-codex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Airtable**
   - Update `src/config/airtable.js` with your credentials:
     - API Key: `patJyxE1gIHMryXKd`
     - Base ID: `Btx8e0n5L`

   Make sure your Airtable base has these tables:
   - Sources
   - Herbs
   - Source Records
   - Emotions
   - Planets

4. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

5. **Run on your device**
   - Install Expo Go app on your iOS or Android device
   - Scan the QR code from the terminal
   - OR press `i` for iOS simulator, `a` for Android emulator

## Project Structure

```
apothecary-codex/
├── src/
│   ├── config/
│   │   ├── airtable.js       # Airtable configuration
│   │   └── theme.js           # App theme and colors
│   ├── navigation/
│   │   └── AppNavigator.js    # Navigation structure
│   ├── screens/
│   │   ├── HomeScreen.js              # Emotion search
│   │   ├── SearchResultsScreen.js     # Search results
│   │   ├── HerbDetailScreen.js        # Herb details with sources
│   │   ├── BrowseHerbsScreen.js       # Browse all herbs
│   │   ├── PlanetsScreen.js           # Planetary browse (premium)
│   │   ├── PlanetDetailScreen.js      # Planet details
│   │   ├── FavoritesScreen.js         # Favorites list
│   │   └── SettingsScreen.js          # App settings
│   ├── services/
│   │   └── airtableService.js # Airtable API calls
│   └── types/
│       └── index.js           # Type definitions
├── App.js                     # Root component
└── package.json

```

## Key Features

### Free Tier
- Emotion-based herb search
- Historical quotes from 3 sources
- Modern applications
- Preparation methods
- Star ratings (⭐⭐⭐)
- Browse all herbs
- Favorites

### Premium Tier ($2.99/month)
- Everything in Free tier PLUS:
- Planetary rulers
- Elemental qualities
- Humoral effects
- Browse by planet
- Energetic explanations

## Development Roadmap

### Phase 1 - MVP (Current)
- [x] Emotion search
- [x] Herb detail pages
- [x] Multi-source citations
- [x] Navigation structure
- [x] Premium content gating
- [ ] SQLite offline caching
- [ ] Data sync

### Phase 2 - Polish
- [ ] Favorites functionality
- [ ] Search by herb name
- [ ] Filter by source
- [ ] Share herb profiles
- [ ] Dark mode

### Phase 3 - Monetization
- [ ] RevenueCat integration
- [ ] Premium subscription flow
- [ ] Free trial
- [ ] Restore purchases

## Data Structure

### Source Records (Main Table)
Each herb can have multiple source records (citations):
- Borage: 2 sources (Culpeper + Gerard)
- Rose: 1 source (Culpeper)
- Total: 81 source records across 58 herbs

### Airtable Tables
1. **Sources** (3): Historical texts
2. **Herbs** (58): Master herb list
3. **Source Records** (81): Historical citations
4. **Emotions** (13): Emotion categories
5. **Planets** (7): Planetary correspondences

## Brand Colors

- **Sky Blue**: #87CEEB (Primary)
- **Golden Yellow**: #FFD700 (Accent/Premium)
- **Navy Blue**: #000080 (Dark)
- **Cream**: #FFFDD0 (Background)

## Legal Notice

This app provides historical information only. Content is for educational purposes and is not medical advice. Always consult qualified healthcare professionals before using herbs for health purposes.

## Troubleshooting

### Airtable Connection Issues
- Verify your API key and Base ID are correct
- Check that all table names match exactly (case-sensitive)
- Ensure your Airtable base has public API access enabled

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

## Contributing

This is a solo project for herbalist practitioners. Feature requests and bug reports welcome!

## License

All rights reserved. Historical source texts are in the public domain.

---

**Version**: 1.0.0
**Last Updated**: December 2024
**Built with** ❤️ **for herbalists**
