# Apothecary Codex - Quick Start Guide 🚀

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies
```bash
cd apothecary-codex
npm install
```

### 2. Verify Airtable Configuration
Your Airtable credentials are already configured in `src/config/airtable.js`:
- API Key: `patJyxE1gIHMryXKd`
- Base ID: `Btx8e0n5L`

### 3. Start the App
```bash
npx expo start
```

### 4. Run on Your Device
Choose one:
- **iOS Simulator**: Press `i` (requires macOS + Xcode)
- **Android Emulator**: Press `a` (requires Android Studio)
- **Physical Device**: Install "Expo Go" app and scan QR code

---

## 🎯 Test the App

### Test Flow 1: Emotion Search
1. Open app → Home screen
2. Search for "grief"
3. See herbs like Borage, Rose, Balm
4. Tap on Borage
5. View multiple sources (Culpeper 1653 + Gerard 1597)

### Test Flow 2: Browse Herbs
1. Tap "Herbs" tab at bottom
2. Browse alphabetical list of all herbs
3. Tap any herb to view details

### Test Flow 3: Premium Content (Currently Mock)
1. Tap "Planets" tab (if premium enabled in App.js)
2. Browse by planetary rulers
3. Or see premium upsells on herb detail pages

---

## 📊 What's Working

✅ **Core Features:**
- Emotion search screen
- Search results with multi-source indicators
- Herb detail pages with historical quotes
- Premium content gating UI
- Bottom tab navigation
- All 6 main screens

✅ **Data Integration:**
- Airtable service configured
- API calls implemented for:
  - Search by emotion
  - Get herb details
  - Browse herbs
  - Browse by planet (premium)

---

## 🔧 Troubleshooting

### "Cannot connect to Airtable"
The app needs internet to fetch data. Make sure:
1. Your device/simulator has internet access
2. Airtable API key is valid
3. Base ID matches your Airtable base

### App won't start
```bash
# Clear cache
npx expo start --clear

# Or reinstall
rm -rf node_modules
npm install
```

### Navigation errors
Make sure all dependencies are installed:
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
```

---

## 🎨 Customization

### Enable Premium Mode
In `App.js`, change:
```javascript
const [isPremium, setIsPremium] = useState(true); // Enable premium
```

### Modify Brand Colors
Edit `src/config/theme.js`:
```javascript
export const BrandColors = {
  skyBlue: '#87CEEB',
  goldenYellow: '#FFD700',
  // ... etc
};
```

---

## 📱 App Structure

```
Home Tab          Herbs Tab         Planets Tab (Premium)
└─ Emotion Search └─ Browse List    └─ Planet List
   └─ Results        └─ Herb Detail     └─ Planet Herbs
      └─ Herb Detail                        └─ Herb Detail
```

---

## 🚀 Next Steps

### Immediate (This Session)
- [x] Core navigation ✅
- [x] Emotion search ✅
- [x] Herb details ✅
- [ ] Test with real Airtable data
- [ ] Fix any data format issues

### Short Term (Next Session)
- [ ] Add SQLite for offline caching
- [ ] Implement favorites with AsyncStorage
- [ ] Add loading states and error handling
- [ ] Polish UI animations

### Medium Term
- [ ] RevenueCat subscription integration
- [ ] Share functionality
- [ ] Search by herb name (not just emotion)
- [ ] Dark mode support

---

## 💡 Tips

1. **Start Simple**: Test emotion search first ("grief", "anxiety", "memory")
2. **Check Console**: Use React Native debugger to see API responses
3. **Mock Data**: If Airtable is slow, add mock data for development
4. **Premium Toggle**: Use `setIsPremium(true)` to test premium features

---

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Review error messages in Expo console
3. Verify Airtable table structure matches expected format
4. Test Airtable API directly: https://airtable.com/api

---

**You're all set! Run `npx expo start` and start testing!** 🌿
