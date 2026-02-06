import React from 'react';
import WeatherCard from './components/WeatherCard';
import AttractionsCard from './components/AttractionsCard';
import RestaurantsCard from './components/RestaurantsCard';
import TransitCard from './components/TransitCard';
import RoutePlannerCard from './components/RoutePlannerCard';
import { weatherData, attractionsData, restaurantsData, transitData } from './mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-nyu-purple text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎓</span>
            <div>
              <h1 className="text-3xl font-bold">NYU Tandon Life Guide</h1>
              <p className="text-purple-200 text-sm mt-1">
                Your campus neighborhood companion
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Card - Full width on mobile, half on desktop */}
          <div className="lg:col-span-2">
            <WeatherCard data={weatherData} />
          </div>

          {/* Route Planner Card - Full width */}
          <div className="lg:col-span-2">
            <RoutePlannerCard />
          </div>

          {/* Attractions Card */}
          <div>
            <AttractionsCard data={attractionsData} />
          </div>

          {/* Restaurants Card */}
          <div>
            <RestaurantsCard data={restaurantsData} />
          </div>

          {/* Transit Card - Full width */}
          <div className="lg:col-span-2">
            <TransitCard data={transitData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>Built for NYU Tandon Students • MetroTech Center, Brooklyn</p>
            <p className="mt-1 text-xs opacity-75">
              Currently showing mock data • Ready for API integration
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
