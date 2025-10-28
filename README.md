# IP Geo Agent - Weather Intelligence System

A comprehensive weather intelligence system built with [Mastra.ai](https://mastra.ai) that provides accurate weather information, forecasting, and activity planning based on weather conditions.

![Weather Agent](https://img.shields.io/badge/Mastra-v0.23.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-ES2022-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.9.0-green.svg)

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions for any location worldwide
- **Weather Forecasting**: Extended weather forecasts with detailed conditions
- **Smart Activity Planning**: AI-powered suggestions for activities based on weather conditions
- **Multi-language Support**: Automatic translation of non-English location names
- **Performance Evaluation**: Built-in scoring system for agent performance monitoring
- **Memory Integration**: Persistent conversation history using LibSQL

## 🏗️ Architecture

The application follows a modular architecture pattern:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Weather Agent │────│  Weather Tools  │────│ External APIs   │
│  (AI Assistant) │    │  (Data Fetch)   │    │ (Open-Meteo)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Weather Workflow│    │  Weather Scorer │    │   LibSQL Store  │
│ (Multi-step)    │    │  (Evaluation)   │    │   (Memory)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Core Components

- **Weather Agent**: AI-powered assistant that handles user interactions and provides weather insights
- **Weather Tool**: Tool for fetching current weather data using Open-Meteo API
- **Weather Workflow**: Multi-step process for weather forecasting and activity planning
- **Weather Scorers**: Performance evaluation system with multiple scoring criteria

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.9.0
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ip-geo-agent
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## 📖 Usage

### Weather Agent

The weather agent can provide weather information and suggest activities based on current conditions:

```typescript
import { weatherAgent } from './src/mastra/agents/weather-agent';

// Example usage
const response = await weatherAgent.text({
  input: "What's the weather like in Paris?",
});
```

### Weather Tool

Direct tool usage for weather data:

```typescript
import { weatherTool } from './src/mastra/tools/weather-tool';

const weatherData = await weatherTool.execute({
  context: { location: "London" }
});
```

### Weather Workflow

Multi-step workflow for comprehensive weather analysis:

```typescript
import { weatherWorkflow } from './src/mastra/workflows/weather-workflow';

const workflowResult = await weatherWorkflow.execute({
  inputData: { city: "New York" }
});
```

## 🛠️ Configuration

### Environment Variables

The application uses the following configuration options (configured in `src/mastra/index.ts`):

- **Storage**: LibSQL configuration for persistent memory
- **Logger**: Pino logger for observability
- **Telemetry**: Currently disabled (deprecated feature)
- **AI Model**: Google Gemini 2.5 Pro for agent processing

### Agent Configuration

The weather agent supports:
- **Model**: `google/gemini-2.5-pro`
- **Memory**: Persistent conversation history
- **Scoring**: Multiple evaluation criteria with 100% sampling rate
- **Tools**: Integration with weather data fetching tools

## 📊 Scoring System

The application includes a comprehensive scoring system:

1. **Tool Call Appropriateness**: Evaluates whether the agent correctly uses available tools
2. **Completeness**: Measures the completeness of agent responses
3. **Translation Quality**: Checks handling of non-English location names

## 🔌 API Integration

### Open-Meteo APIs

The application integrates with two Open-Meteo APIs:

1. **Geocoding API**: Converts location names to coordinates
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`
   - No authentication required

2. **Weather API**: Fetches current weather and forecast data
   - Endpoint: `https://api.open-meteo.com/v1/forecast`
   - No authentication required

### Supported Weather Data

- Temperature (°C/°F)
- Feels-like temperature
- Relative humidity
- Wind speed and gusts
- Weather conditions (WMO weather codes)
- Precipitation probability

## 📁 Project Structure

```
ip-geo-agent/
├── src/
│   └── mastra/
│       ├── agents/
│       │   └── weather-agent.ts      # AI agent configuration
│       ├── tools/
│       │   └── weather-tool.ts       # Weather data fetching tool
│       ├── workflows/
│       │   └── weather-workflow.ts   # Multi-step weather process
│       ├── scorers/
│       │   └── weather-scorer.ts     # Performance evaluation
│       └── index.ts                  # Main application configuration
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests (not configured)

### Development Setup

1. Ensure Node.js >= 20.9.0 is installed
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. The application will be available at the development server URL

### Code Style

- TypeScript ES2022 modules
- Strict mode enabled
- ES2022 syntax with proper extensions
- Comprehensive type checking

## 🔧 Technical Details

### Dependencies

**Core Dependencies:**
- `@mastra/core`: Main Mastra framework
- `@mastra/evals`: Evaluation and scoring system
- `@mastra/libsql`: Database storage
- `@mastra/loggers`: Logging functionality
- `@mastra/memory`: Memory management
- `zod`: Schema validation

**Development Dependencies:**
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions
- `mastra`: Development and build tools

### Database Configuration

- **Agent Memory**: LibSQL database (`file:../mastra.db`) for conversation history
- **Main Storage**: In-memory LibSQL for observability and scores
- **Persistence**: Agent memory persists to file system

### Error Handling

- Location validation and error handling
- API failure handling
- Comprehensive error messages for debugging
- Graceful fallbacks for weather data

## 🌍 Supported Features

### Location Support
- Global location search via geocoding API
- Multi-language location name support
- Automatic translation for non-English locations
- Smart location name processing

### Weather Conditions
- Comprehensive WMO weather code mapping
- Real-time and forecast data
- Temperature, humidity, wind, and precipitation data
- Weather condition descriptions

### Activity Planning
- AI-powered activity suggestions
- Weather-appropriate recommendations
- Time-specific activity timing
- Indoor/outdoor alternatives
- Location-specific venue suggestions

## 📝 License

ISC License

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- All dependencies are properly managed
- Documentation is updated for new features
- Tests are added for new functionality

## 🔮 Future Enhancements

- Extended forecast periods
- Historical weather data
- Weather alerts and warnings
- Integration with additional weather services
- Enhanced activity recommendation algorithms
- Multi-language weather descriptions

---

**Note**: This project uses Open-Meteo APIs which are free and do not require authentication. For production use, consider rate limiting and caching strategies.