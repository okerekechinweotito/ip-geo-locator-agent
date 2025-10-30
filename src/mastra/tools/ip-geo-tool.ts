import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const IPGeoToolOutputSchema = z.object({
  ip: z.string(),
  success: z.boolean(),
  type: z.string(),
  continent: z.string(),
  continent_code: z.string(),
  country: z.string(),
  country_code: z.string(),
  region: z.string(),
  region_code: z.string(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  is_eu: z.boolean(),
  postal: z.string(),
  calling_code: z.string(),
  capital: z.string(),
  borders: z.string(),
  flag: z.object({
    img: z.string().url(),
    emoji: z.string(),
    emoji_unicode: z.string(),
  }),
  connection: z.object({
    asn: z.number(),
    org: z.string(),
    isp: z.string(),
    domain: z.string().nullable(),
  }),
  timezone: z.object({
    id: z.string(),
    abbr: z.string(),
    is_dst: z.boolean(),
    offset: z.number(),
    utc: z.string(),
    current_time: z.string(),
  }),
});

export type IPGeoToolOutput = z.infer<typeof IPGeoToolOutputSchema>;

export const IPGeoTool = createTool({
  id: "get-ip-geo",
  description: "Get Geolocation details of an IP Address",
  inputSchema: z.object({
    location: z.string().describe("IP Address"),
  }),
  outputSchema: IPGeoToolOutputSchema,
  execute: async ({ context }) => {
    return await getIPGeo(context.location);
  },
});

const getIPGeo = async (ipAddress: string): Promise<IPGeoToolOutput> => {
  try {
    const response = await fetch(`https://ipwho.is/${ipAddress}`);
    const data = await response.json();
    return data as IPGeoToolOutput;
  } catch (error) {
    throw new Error(`Failed to fetch IP Geo data: ${error}`);
  }
};
