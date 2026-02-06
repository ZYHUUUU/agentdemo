import React from 'react';

const WeatherCard = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Weather</h2>
        <span className="text-5xl">{data.icon}</span>
      </div>

      <div className="mb-4">
        <div className="text-5xl font-bold mb-2">{data.temperature}°F</div>
        <div className="text-xl opacity-90">{data.condition}</div>
        <div className="text-sm opacity-75 mt-1">{data.location}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <div className="opacity-75">Feels Like</div>
          <div className="font-semibold">{data.feelsLike}°F</div>
        </div>
        <div>
          <div className="opacity-75">Humidity</div>
          <div className="font-semibold">{data.humidity}%</div>
        </div>
        <div>
          <div className="opacity-75">Wind</div>
          <div className="font-semibold">{data.windSpeed} mph</div>
        </div>
      </div>

      <div className="border-t border-white/20 pt-4">
        <div className="grid grid-cols-4 gap-2">
          {data.forecast.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs opacity-75 mb-1">{day.day}</div>
              <div className="text-2xl mb-1">{day.icon}</div>
              <div className="text-xs">
                <span className="font-semibold">{day.high}°</span>
                <span className="opacity-75">/{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
