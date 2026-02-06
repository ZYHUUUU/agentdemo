import React, { useState } from 'react';
import { allLocations, routeDistances } from '../mockData';
import { planRouteWithClaude } from '../services/claudeService';

const RoutePlannerCard = () => {
  const [input, setInput] = useState('');
  const [route, setRoute] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle route planning with AI
  const handlePlanRoute = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Call Claude API to plan the route
      const locationIds = await planRouteWithClaude(input, allLocations);

      if (!locationIds || locationIds.length === 0) {
        throw new Error('AI 无法理解您的行程，请尝试更具体的描述');
      }

      // Map IDs to full location objects
      const plannedRoute = locationIds
        .map(id => allLocations.find(loc => loc.id === id || loc.id === String(id)))
        .filter(Boolean); // Remove any undefined values

      if (plannedRoute.length === 0) {
        throw new Error('未找到匹配的地点，请重新描述您的行程');
      }

      // Calculate total time
      let total = 0;
      for (let i = 0; i < plannedRoute.length - 1; i++) {
        total += getWalkTime(plannedRoute[i], plannedRoute[i + 1]);
      }

      setRoute(plannedRoute);
      setTotalTime(total);
      setError(null);

    } catch (err) {
      console.error('Route planning error:', err);

      let errorMessage = '路线规划失败';

      if (err.message.includes('API key')) {
        errorMessage = '⚠️ 请先在 .env 文件中设置您的 VITE_CLAUDE_API_KEY';
      } else if (err.message.includes('network') || err.message.includes('fetch')) {
        errorMessage = '❌ 网络错误，请检查您的网络连接';
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setRoute([]);
      setTotalTime(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the current route
  const handleClearRoute = () => {
    setInput('');
    setRoute([]);
    setTotalTime(0);
    setError(null);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handlePlanRoute();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <span>🤖</span>
        AI Route Planner
        <span className="text-xs font-normal bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full ml-2">
          Powered by Claude
        </span>
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          用自然语言描述你的行程，AI 会智能理解并规划路线：<br />
          例如："我想去一个适合看夕阳的地方然后回学校" 🌅
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder="试试：我想找个地方放松一下..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nyu-purple focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handlePlanRoute}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-nyu-purple text-white rounded-lg hover:bg-nyu-purple-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>思考中</span>
              </>
            ) : (
              '规划'
            )}
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
              <span className="animate-pulse">🤖</span>
              <span>AI Agent 正在分析您的需求...</span>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300 text-sm">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
            {error.includes('API key') && (
              <p className="text-xs mt-2 text-red-600 dark:text-red-400">
                获取 API Key：<a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="underline ml-1">Anthropic Console</a>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Route Display */}
      {route.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="text-nyu-purple">总步行时间：</span>
              <span className="text-lg font-bold ml-2">{totalTime} 分钟</span>
              <span className="text-xs ml-2 text-gray-500">({route.length} 个地点)</span>
            </div>
            <button
              onClick={handleClearRoute}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              清空路线
            </button>
          </div>

          {/* AI Planning Badge */}
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span>✨</span>
              <span className="font-medium">AI 已为您规划最佳路线</span>
            </div>
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
      {route.length === 0 && !isLoading && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            💡 试试这些智能语义示例：
          </p>
          <div className="space-y-1">
            {[
              '我想去一个适合看夕阳的地方然后回学校',
              '找个地方吃午饭，最好是意大利菜',
              '我想放松一下，散散步看看风景',
              '去个有艺术气息的地方逛逛',
              '喝杯咖啡提提神，然后去最近的景点'
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
