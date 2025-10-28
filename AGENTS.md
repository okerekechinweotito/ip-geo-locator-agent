# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build/Lint/Test Commands

- `npm run dev` - Start Mastra development server
- `npm run build` - Build project for production
- `npm run start` - Start production server
- No tests configured in package.json (default test script exists but fails)

## Project Architecture & Flow

- **Main Entry**: `src/mastra/index.ts` - Mastra instance configuration
- **Component Structure**: Agents → Tools → Workflows → Scoring system
- **Data Flow**: Agent receives request → Uses tools for external API calls → Executes workflows → Results evaluated by scorers
- **External APIs**: Open-Meteo weather API + geocoding API (free, no authentication required)

## Critical Configuration Patterns

- **Database Paths**: Agent memory uses `file:../mastra.db` (relative to `.mastra/output/`) while main storage uses `:memory:` - this inconsistency can cause data persistence issues
- **Scorer Sampling**: All scorers use 100% sampling rate (`rate: 1`) which may impact performance in production
- **Model Configuration**: Weather agent uses `google/gemini-2.5-pro` - ensure API key availability
- **Telemetry**: Disabled in main config but will be removed completely in November 4th release

## Weather-Specific Patterns

- **Location Handling**: Project includes custom translation logic for non-English location names
- **API Calls**: Uses Open-Meteo with specific parameter combinations (geocoding first, then weather fetch)
- **Weather Codes**: Custom mapping function for WMO weather codes in both tool and workflow
- **Activity Planning**: Workflow uses agent streaming (`agent.stream()`) for generating detailed activity suggestions

## Error Handling Patterns

- Tools throw specific errors for location not found
- Workflow steps validate input data and throw descriptive errors
- All external API calls lack retry logic (potential single point of failure)
- Geocoding and weather API calls are sequential, not parallelized

## Storage Architecture

- **Agent Memory**: Separate LibSQL instance for conversation history (`file:../mastra.db`)
- **Main Storage**: Separate LibSQL instance for observability/scores (`:memory:` by default)
- **Persistence**: Only agent memory persists to file system; main storage is ephemeral unless changed to `file:../mastra.db`

## Development Constraints

- Node.js >=20.9.0 required (specified in engines)
- ES2022 modules only (no CommonJS)
- TypeScript strict mode enabled
- All imports use ES2022 syntax with proper extensions
