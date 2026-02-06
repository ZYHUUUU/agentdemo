# NYU Tandon Life Guide 🎓

A beautiful, responsive web dashboard showcasing life around NYU Tandon's Brooklyn campus (MetroTech Center area).

## 🚀 Features

- **Weather** - Current conditions and 4-day forecast for Brooklyn
- **Attractions** - Nearby landmarks like Brooklyn Bridge, DUMBO, etc.
- **Food & Dining** - Best restaurants around MetroTech Center
- **Transit Info** - Real-time subway status for nearby stations (A/C/F/R lines)

## 🛠️ Tech Stack

- **Vite** - Lightning-fast build tool
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **NYU Purple (#57068c)** - Brand color theming

## 📦 Installation & Setup

```bash
# Navigate to project directory
cd ~/Desktop/projectB

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
projectB/
├── src/
│   ├── components/          # React components
│   │   ├── WeatherCard.jsx
│   │   ├── AttractionsCard.jsx
│   │   ├── RestaurantsCard.jsx
│   │   └── TransitCard.jsx
│   ├── mockData.js          # Mock data for all modules
│   ├── App.jsx              # Main app component
│   ├── main.jsx
│   └── index.css            # Tailwind imports
├── tailwind.config.js       # Tailwind configuration (with NYU colors)
└── package.json
```

## 🔄 API Integration (Future)

All data is currently stored in `src/mockData.js`. To integrate real APIs:

1. **Weather**: Use OpenWeather API or Weather.gov
2. **Attractions**: Use Google Places API or Yelp Fusion
3. **Restaurants**: Use Yelp API or Google Places
4. **Transit**: Use MTA Real-Time Data Feeds

Example structure:
```javascript
// Replace mock imports in App.jsx
import { weatherData } from './mockData';
// with API calls
const weatherData = await fetch('https://api.weather.com/...');
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  'nyu-purple': '#57068c',
  'nyu-purple-light': '#8900e1',
  'nyu-purple-dark': '#330662',
}
```

### Dark Mode
The app supports system dark mode by default through Tailwind's `dark:` classes.

## 📱 Responsive Design

- Mobile-first design
- Grid layout adapts from 1 column (mobile) to 2 columns (desktop)
- All cards are touch-friendly and optimized for readability

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to any static hosting service.

## 📍 Location Context

This app is tailored for NYU Tandon Engineering School:
- **Campus**: MetroTech Center, Brooklyn, NY
- **Nearest Subway**: Jay Street-MetroTech (A/C/F/R)
- **Neighborhood**: Downtown Brooklyn / DUMBO area

---

**Note**: Currently using mock data. All API integrations are ready to be implemented.
