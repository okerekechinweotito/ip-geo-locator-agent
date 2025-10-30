# IP Geolocation Agent

This project implements a Mastra agent that provides geolocation information for a given IP address.

## Description

The `IPGeoAgent` is a helpful assistant that fetches and displays detailed geolocation data for a specific IP address. It uses the `IPGeoTool` to retrieve information such as country, city, latitude, longitude, timezone, and more.

## Getting Started

### Prerequisites

- Node.js (>=20.9.0)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ip-geo-agent.git
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```

## Usage

1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Interact with the agent through the Mastra interface.

## Dependencies

- `@mastra/core`: Core Mastra framework
- `@mastra/evals`: For evaluations
- `@mastra/libsql`: For database storage
- `@mastra/loggers`: For logging
- `@mastra/memory`: For memory management
- `zod`: For data validation
