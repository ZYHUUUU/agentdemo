// Mock Data for NYU Tandon Campus Area
// Location: Brooklyn, NY (MetroTech Center area)

export const weatherData = {
  temperature: 38,
  condition: "Partly Cloudy",
  feelsLike: 32,
  humidity: 65,
  windSpeed: 12,
  icon: "⛅",
  location: "Brooklyn, NY",
  forecast: [
    { day: "Mon", high: 40, low: 30, icon: "🌤️" },
    { day: "Tue", high: 42, low: 33, icon: "☁️" },
    { day: "Wed", high: 38, low: 28, icon: "🌨️" },
    { day: "Thu", high: 45, low: 35, icon: "🌤️" },
  ]
};

export const attractionsData = [
  {
    id: 1,
    name: "Brooklyn Bridge Park",
    description: "Stunning waterfront park with Manhattan skyline views",
    distance: "1.2 miles",
    rating: 4.8,
    image: "🌉",
    category: "Park"
  },
  {
    id: 2,
    name: "DUMBO",
    description: "Trendy neighborhood with cobblestone streets and art galleries",
    distance: "0.8 miles",
    rating: 4.7,
    image: "🎨",
    category: "Neighborhood"
  },
  {
    id: 3,
    name: "Brooklyn Bridge",
    description: "Iconic bridge connecting Brooklyn and Manhattan",
    distance: "1.0 miles",
    rating: 4.9,
    image: "🌁",
    category: "Landmark"
  },
  {
    id: 4,
    name: "Jane's Carousel",
    description: "Historic carousel in Brooklyn Bridge Park",
    distance: "1.3 miles",
    rating: 4.6,
    image: "🎠",
    category: "Entertainment"
  }
];

export const restaurantsData = [
  {
    id: 1,
    name: "Shake Shack",
    cuisine: "American",
    distance: "0.2 miles",
    rating: 4.5,
    priceRange: "$$",
    address: "MetroTech Center",
    image: "🍔",
    isOpen: true
  },
  {
    id: 2,
    name: "Chipotle Mexican Grill",
    cuisine: "Mexican",
    distance: "0.3 miles",
    rating: 4.3,
    priceRange: "$",
    address: "Lawrence St",
    image: "🌯",
    isOpen: true
  },
  {
    id: 3,
    name: "Joe's Pizza",
    cuisine: "Italian",
    distance: "0.4 miles",
    rating: 4.7,
    priceRange: "$",
    address: "Fulton St",
    image: "🍕",
    isOpen: true
  },
  {
    id: 4,
    name: "Poke Bowl",
    cuisine: "Japanese",
    distance: "0.3 miles",
    rating: 4.4,
    priceRange: "$$",
    address: "Jay Street",
    image: "🍱",
    isOpen: false
  },
  {
    id: 5,
    name: "Court Street Grocers",
    cuisine: "Deli",
    distance: "0.5 miles",
    rating: 4.6,
    priceRange: "$$",
    address: "Court St",
    image: "🥪",
    isOpen: true
  }
];

export const transitData = {
  nearbyStations: [
    {
      id: 1,
      name: "Jay Street-MetroTech",
      lines: ["A", "C", "F", "R"],
      distance: "0.1 miles",
      status: "Good Service",
      statusColor: "green",
      walkTime: "2 min"
    },
    {
      id: 2,
      name: "Borough Hall",
      lines: ["2", "3", "4", "5"],
      distance: "0.4 miles",
      status: "Good Service",
      statusColor: "green",
      walkTime: "8 min"
    },
    {
      id: 3,
      name: "DeKalb Avenue",
      lines: ["B", "Q", "R"],
      distance: "0.5 miles",
      status: "Delays",
      statusColor: "yellow",
      walkTime: "10 min"
    },
    {
      id: 4,
      name: "York Street",
      lines: ["F"],
      distance: "0.6 miles",
      status: "Good Service",
      statusColor: "green",
      walkTime: "12 min"
    }
  ],
  serviceAlerts: [
    {
      id: 1,
      line: "B",
      message: "Weekend service changes in effect",
      severity: "info"
    },
    {
      id: 2,
      line: "Q",
      message: "Some trains running with delays due to signal problems",
      severity: "warning"
    }
  ]
};

// Route Planning Data
export const baseLocation = {
  id: 'tandon',
  name: 'NYU Tandon',
  type: 'campus',
  keywords: ['tandon', 'nyu', 'school', 'campus', '回学校', '回tandon'],
  image: '🎓',
  description: 'NYU Tandon School of Engineering'
};

// Extended locations including coffee shops
export const coffeeShops = [
  {
    id: 'coffee1',
    name: 'Starbucks MetroTech',
    type: 'coffee',
    keywords: ['咖啡', 'coffee', 'starbucks', '星巴克'],
    image: '☕',
    distance: '0.2 miles',
    walkMinutes: 4,
    address: 'MetroTech Center'
  },
  {
    id: 'coffee2',
    name: 'Brooklyn Roasting Company',
    type: 'coffee',
    keywords: ['咖啡', 'coffee', 'brooklyn roasting'],
    image: '☕',
    distance: '0.5 miles',
    walkMinutes: 10,
    address: 'Jay Street'
  }
];

// Calculate walking time between locations (in minutes)
export const routeDistances = {
  'tandon-coffee1': 4,
  'coffee1-tandon': 4,
  'tandon-coffee2': 10,
  'coffee2-tandon': 10,
  'tandon-dumbo': 16,
  'dumbo-tandon': 16,
  'tandon-brooklyn-bridge-park': 25,
  'brooklyn-bridge-park-tandon': 25,
  'tandon-brooklyn-bridge': 20,
  'brooklyn-bridge-tandon': 20,
  'coffee1-dumbo': 14,
  'dumbo-coffee1': 14,
  'coffee2-dumbo': 8,
  'dumbo-coffee2': 8,
  'brooklyn-bridge-park-dumbo': 5,
  'dumbo-brooklyn-bridge-park': 5,
  'brooklyn-bridge-dumbo': 8,
  'dumbo-brooklyn-bridge': 8,
  'coffee1-brooklyn-bridge-park': 23,
  'brooklyn-bridge-park-coffee1': 23,
  'coffee1-shake-shack': 3,
  'shake-shack-coffee1': 3,
  'tandon-shake-shack': 4,
  'shake-shack-tandon': 4,
  'tandon-joes-pizza': 8,
  'joes-pizza-tandon': 8,
  'shake-shack-dumbo': 16,
  'dumbo-shake-shack': 16,
};

// Enhanced location database for route planning
export const allLocations = [
  baseLocation,
  ...coffeeShops,
  ...attractionsData.map(a => ({
    ...a,
    type: 'attraction',
    keywords: [
      a.name.toLowerCase(),
      ...a.name.toLowerCase().split(' '),
      a.category.toLowerCase()
    ],
    walkMinutes: parseFloat(a.distance) * 20 // rough estimate: 1 mile = 20 min walk
  })),
  ...restaurantsData.map(r => ({
    ...r,
    type: 'restaurant',
    keywords: [
      r.name.toLowerCase(),
      r.cuisine.toLowerCase(),
      ...r.name.toLowerCase().split(' ')
    ],
    walkMinutes: parseFloat(r.distance) * 20
  }))
];
