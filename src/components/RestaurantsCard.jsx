import React from 'react';

const RestaurantsCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <span>🍽️</span>
        Food & Dining
      </h2>

      <div className="space-y-3">
        {data.map((restaurant) => (
          <div
            key={restaurant.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{restaurant.image}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {restaurant.name}
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    restaurant.isOpen
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {restaurant.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span>{restaurant.cuisine}</span>
                  <span>•</span>
                  <span>{restaurant.priceRange}</span>
                  <span>•</span>
                  <span>⭐ {restaurant.rating}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  📍 {restaurant.distance} • {restaurant.address}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsCard;
