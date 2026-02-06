import React, { useState } from 'react';
import { allLocations, baseLocation, routeDistances } from '../mockData';

const RoutePlannerCard = () => {
  const [input, setInput] = useState('');
  const [route, setRoute] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  // Natural language parser - extracts locations from user input
  const parseInput = (text) => {
    const lowerText = text.toLowerCase();
    const foundLocations = [];

    // Check for each location's keywords in the input
    allLocations.forEach(location => {
      if (location.keywords) {
        const hasMatch = location.keywords.some(keyword =>
          lowerText.includes(keyword)
        );
        if (hasMatch && !foundLocations.find(l => l.id === location.id)) {
          foundLocations.push(location);
        }
      }
    });

    return foundLocations;
  };

  // Calculate walking time between two locations
  const getWalkTime = (from, to) => {
    const fromId = from.id === 'tandon' ? 'tandon' : from.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    const toId = to.id === 'tandon' ? 'tandon' : to.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    const key = `${fromId}-${toId}`;

    // Check if we have exact distance data
    if (routeDistances[key]) {
      return routeDistances[key];
    }

    // Fallback: estimate based on individual distances from Tandon
    const fromDist = parseFloat(from.distance || '0');
    const toDist = parseFloat(to.distance || '0');
    return Math.round(Math.abs(fromDist - toDist) * 20 + 5); // rough estimate
  };

  // Handle route planning
  const handlePlanRoute = () => {
    if (!input.trim()) return;

    const locations = parseInput(input);

    if (locations.length === 0) {
      alert('无法识别地点，请尝试提到具体的地点名称，如：咖啡、DUMBO、Brooklyn Bridge等');
      return;
    }

    // Add starting point (Tandon) if not already included
    let finalRoute = [];
    if (!locations.some(l => l.id === 'tandon')) {
      finalRoute.push(baseLocation);
    }
    finalRoute = [...finalRoute, ...locations];

    // Add return to Tandon if mentioned in input
    if (input.match(/回|return|back/i) && finalRoute[finalRoute.length - 1].id !== 'tandon') {
      finalRoute.push(baseLocation);
    }

    // Calculate total time
    let total = 0;
    for (let i = 0; i < finalRoute.length - 1; i++) {
      total += getWalkTime(finalRoute[i], finalRoute[i + 1]);
    }

    setRoute(finalRoute);
    setTotalTime(total);
  };

  // Clear the current route
  const handleClearRoute = () => {
    setInput('');
    setRoute([]);
    setTotalTime(0);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePlanRoute();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <span>🗺️</span>
        Route Planner
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          用自然语言描述你的行程，例如：<br />
          "我想先去喝咖啡，然后去 DUMBO 逛逛，最后回 Tandon"
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入你的行程计划..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nyu-purple focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handlePlanRoute}
            className="px-6 py-3 bg-nyu-purple text-white rounded-lg hover:bg-nyu-purple-dark transition-colors font-medium"
          >
            规划
          </button>
        </div>
      </div>

      {/* Route Display */}
      {route.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="text-nyu-purple">总步行时间：</span>
              <span className="text-lg font-bold ml-2">{totalTime} 分钟</span>
            </div>
            <button
              onClick={handleClearRoute}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              清空路线
            </button>
          </div>

          <div className="space-y-3">
            {route.map((location, index) => {
              const walkTime = index < route.length - 1
                ? getWalkTime(location, route[index + 1])
                : 0;

              return (
                <div key={`${location.id}-${index}`}>
                  {/* Location Card */}
                  <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border-l-4 border-nyu-purple">
                    <div className="flex items-center justify-center w-8 h-8 bg-nyu-purple text-white rounded-full font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="text-3xl">{location.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {location.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {location.description || location.address || location.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {location.distance || '校园内'}
                      </span>
                    </div>
                  </div>

                  {/* Arrow and Walking Time */}
                  {index < route.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-nyu-purple to-blue-500"></div>
                        <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          🚶 {walkTime} 分钟
                        </span>
                        <div className="h-8 w-0.5 bg-gradient-to-b from-blue-500 to-nyu-purple"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Visual Route Summary */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              路线概览：
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {route.map((location, index) => (
                <React.Fragment key={`summary-${location.id}-${index}`}>
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                    <span>{location.image}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {location.name}
                    </span>
                  </div>
                  {index < route.length - 1 && (
                    <span className="text-nyu-purple">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Example prompts */}
      {route.length === 0 && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            💡 试试这些示例：
          </p>
          <div className="space-y-1">
            {[
              '我想先去喝咖啡，然后去 DUMBO 逛逛，最后回 Tandon',
              '去 Brooklyn Bridge Park 散步，然后回学校',
              '吃披萨，然后去 Brooklyn Bridge'
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setInput(example)}
                className="block w-full text-left text-xs text-gray-600 dark:text-gray-400 hover:text-nyu-purple dark:hover:text-purple-400 py-1 px-2 rounded hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePlannerCard;
