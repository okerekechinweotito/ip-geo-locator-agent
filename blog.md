# Creating and Integrating an A2A Agent with Mastra

In this blog post, we'll walk through the process of creating an Agent-to-Agent (A2A) agent using Mastra, deploying it to Mastra Cloud, and connecting it to Telex. Our agent will be a simple IP Geolocation agent that takes an IP address and returns geolocation information.

## What is an A2A Agent?

A2A, or Agent-to-Agent, is a communication protocol that allows AI agents to interact with each other. This enables complex workflows and tasks to be completed by a team of specialized agents. For more details, you can refer to the [A2A specificiation](https://github.com/a2a-spec/a2a-spec).

## What is Mastra?

Mastra is a framework for building and deploying AI agents. It provides a set of tools and libraries that simplify the process of creating, testing, and deploying agents.

## Prerequisites

Before we begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.9.0 or higher)
- [Mastra CLI](https://mastra.ai/docs/cli): You can install it using pnpm:
  ```bash
  pnpm i -g mastra
  ```

## Step 1: Create a new Mastra project

First, let's create a new Mastra project called `ip-geo-agent`:

```bash
mastra init ip-geo-agent
```

This will create a new directory called `ip-geo-agent` with a basic Mastra project structure.

## Step 2: Create the IP-Geo Tool

Next, we'll create a tool that our agent will use to fetch geolocation information for an IP address. Create a new file at `src/mastra/tools/ip-geo-tool.ts` with the following content:

```typescript
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
```

This tool uses the `ipwho.is` API to fetch geolocation data. It defines the input and output schemas for the tool, and the `execute` function that calls the API.

## Step 3: Create the IP-Geo Agent

Now, let's create the agent that will use our `IPGeoTool`. Create a new file at `src/mastra/agents/ip-geo-agent.ts` with the following content:

```typescript
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
  model: "google/gemini-1.5-flash",
  tools: { IPGeoTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
```

This agent is instructed to be a helpful IPGeoAgent. It uses the `IPGeoTool` to fetch the data and is configured to use a `LibSQLStore` for memory.

## Step 4: Create the A2A Route

To expose our agent as an A2A endpoint, we need to create a route. Create a new file at `src/mastra/agents/ip-geo-agent.route.ts` with the following content:

```typescript
import { registerApiRoute } from "@mastra/core/server";
import { randomUUID } from "crypto";

export const a2aAgentRoute = registerApiRoute("/a2a/agent/:agentId", {
  method: "POST",
  handler: async (c) => {
    try {
      const mastra = c.get("mastra");
      const agentId = c.req.param("agentId");

      // Parse JSON-RPC 2.0 request
      const body = await c.req.json();
      const { jsonrpc, id: requestId, method, params } = body;

      // Validate JSON-RPC 2.0 format
      if (jsonrpc !== "2.0" || !requestId) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId || null,
            error: {
              code: -32600,
              message:
                'Invalid Request: jsonrpc must be "2.0" and id is required',
            },
          },
          400
        );
      }

      const agent = mastra.getAgent(agentId);
      if (!agent) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId,
            error: {
              code: -32602,
              message: `Agent '${agentId}' not found`,
            },
          },
          404
        );
      }

      // Extract messages from params
      const { message, messages, contextId, taskId, metadata } = params || {};

      let messagesList = [];
      if (message) {
        messagesList = [message];
      } else if (messages && Array.isArray(messages)) {
        messagesList = messages;
      }

      // Convert A2A messages to Mastra format
      const mastraMessages = messagesList.map((msg) => ({
        role: msg.role,
        content:
          msg.parts
            ?.map((part: any) => {
              if (part.kind === "text") return part.text;
              if (part.kind === "data") return JSON.stringify(part.data);
              return "";
            })
            .join("
") || "",
      }));

      // Execute agent
      const response = await agent.generate(mastraMessages);
      const agentText = response.text || "";

      // Build artifacts array
      const artifacts = [
        {
          artifactId: randomUUID(),
          name: `${agentId}Response`,
          parts: [{ kind: "text", text: agentText }],
        },
      ];

      // Add tool results as artifacts
     if (response.toolResults && response.toolResults.length > 0) {
       artifacts.push({
         artifactId: randomUUID(),
         name: "ToolResults",
         // @ts-ignore
         parts: response.toolResults.map((result) => ({
           kind: "data",
           data: result,
         })),
       });
     }


      // Build conversation history
      const history = [
        ...messagesList.map((msg) => ({
          kind: "message",
          role: msg.role,
          parts: msg.parts,
          messageId: msg.messageId || randomUUID(),
          taskId: msg.taskId || taskId || randomUUID(),
        })),
        {
          kind: "message",
          role: "agent",
          parts: [{ kind: "text", text: agentText }],
          messageId: randomUUID(),
          taskId: taskId || randomUUID(),
        },
      ];

      // Return A2A-compliant response
      return c.json({
        jsonrpc: "2.0",
        id: requestId,
        result: {
          id: taskId || randomUUID(),
          contextId: contextId || randomUUID(),
          status: {
            state: "completed",
            timestamp: new Date().toISOString(),
            message: {
              messageId: randomUUID(),
              role: "agent",
              parts: [{ kind: "text", text: agentText }],
              kind: "message",
            },
          },
          artifacts,
            history,
          kind: "task",
        },
      });
    } catch (error: any) {
      return c.json(
        {
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32603,
            message: "Internal error",
            data: { details: error.message },
          },
        },
        500
      );
    }
  },
});
```

This route handles the A2A JSON-RPC 2.0 requests, converts them to the Mastra message format, executes the agent, and returns an A2A-compliant response.

## Step 5: Deploy to Mastra Cloud

Now that our agent is ready, we can deploy it to Mastra Cloud. Run the following command in your terminal:

```bash
mastra deploy
```

This will deploy your agent and make it accessible via a public URL. After the deployment is complete, you will see the URL for your agent in the terminal. It will look something like this:

```
https://<your-project-name>.mastra.app
```

## Step 6: Connect to Telex

Telex is a tool that allows you to interact with A2A agents. To connect your agent to Telex, you'll need the agent's URL. The A2A endpoint for our agent will be:

```
https://<your-project-name>.mastra.app/a2a/agent/IPGeoAgent
```

Head over to [Telex](https://telex.im) and use this URL to start interacting with your IPGeoAgent.

## Mastra Features Used

In this project, we utilized several key features of Mastra to build and deploy our agent:

- **@mastra/core**: The core library for building agents, including the `Agent` class and `createTool` function.
- **@mastra/memory**: For providing our agent with memory, allowing it to remember past interactions.
- **@mastra/libsql**: A specific storage implementation for memory, using a local SQLite database.
- **@mastra/core/server**: For creating the A2A API route to expose our agent.
- **Mastra CLI**: For initializing the project and deploying it to Mastra Cloud.

## Step 6: Connect to Telex

Telex is an AI agent platform like Make that allows you to interact with A2A agents. You can also describe it as a slack alternative for education or slack alternative for communities or slack alternative for bootcamps. You can check out their home page [here](https://telex.im/).

To connect your agent to Telex, you'll need the agent's URL. The A2A endpoint for our agent will be:

```
https://<your-project-name>.mastra.app/a2a/agent/IPGeoAgent
```

You can interact with the deployed agent [here](https://telex.im/telex-ai-intergration/home/colleagues/019a3f85-771c-7163-a3c5-c61e76cf285b/019a3f85-6251-7162-bff4-6cb4aefc9bdc). This agent takes an IP address and returns geolocation information.

## Conclusion

In this blog post, we've learned how to create an A2A agent with Mastra, deploy it to Mastra Cloud, and connect it to Telex. You can now use this knowledge to build your own specialized agents and connect them to the A2A network.
