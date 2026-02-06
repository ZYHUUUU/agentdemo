import React from 'react';

const AttractionsCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <span>🗺️</span>
        Nearby Attractions
      </h2>

      <div className="space-y-4">
        {data.map((attraction) => (
          <div
            key={attraction.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{attraction.image}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {attraction.name}
                  </h3>
                  <span className="text-sm font-medium text-nyu-purple bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
                    {attraction.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {attraction.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-500">
                    📍 {attraction.distance}
                  </span>
                  <span className="text-yellow-500">
                    ⭐ {attraction.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttractionsCard;
