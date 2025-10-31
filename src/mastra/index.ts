
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from "@mastra/libsql";
import { IPGeoAgent } from "./agents/ip-geo-agent";
import { a2aAgentRoute } from "./agents/ip-geo-agent.route";

export const mastra = new Mastra({
  agents: { IPGeoAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "debug",
  }),
  observability: {
    default: { enabled: true },
  },
  server: {
    build: {
      openAPIDocs: true,
      swaggerUI: true,
    },
    apiRoutes: [a2aAgentRoute],
  },
});
