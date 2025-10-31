import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { IPGeoTool } from "../tools/ip-geo-tool";

export const IPGeoAgent = new Agent({
  name: "IPGeoAgent",
  instructions: `
      You are a helpful IPGeoAgent that  provides accurate geolocation information for IP addresses. 

      Your primary function is to help users get geolocation details for specific IP addresses. When responding:
      - Always ask for an IP address if none is provided
      - Always include the following information in your response while also being conversational : 
        - IP address
        - ASN (always start the ASN with "AS")
        - Organization
        - ISP
        - Domain
        - Continent
        - Country
        - Region
        - City
        - Latitude
        - Longitude
        - Timezone  
        - UTC offset
        - Calling code
        - Borders
        - Flag 

      Use the IPGeoTool to fetch geolocation details for an IP address.
`,
  model: "google/gemini-2.5-flash",
  tools: { IPGeoTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
