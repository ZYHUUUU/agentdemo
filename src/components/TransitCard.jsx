import React from 'react';

const TransitCard = ({ data }) => {
  const getStatusColor = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'red':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <span>🚇</span>
        Transit Info
      </h2>

      {/* Service Alerts */}
      {data.serviceAlerts.length > 0 && (
        <div className="mb-4 space-y-2">
          {data.serviceAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg text-sm ${
                alert.severity === 'warning'
                  ? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  : 'bg-blue-50 border-l-4 border-blue-400 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
              }`}
            >
              <span className="font-semibold">{alert.line} Line:</span> {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* Nearby Stations */}
      <div className="space-y-3">
        {data.nearbyStations.map((station) => (
          <div
            key={station.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  {station.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {station.lines.map((line, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-nyu-purple text-white font-bold text-sm"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(station.statusColor)}`}>
                {station.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>📍 {station.distance}</span>
              <span>🚶 {station.walkTime} walk</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransitCard;
