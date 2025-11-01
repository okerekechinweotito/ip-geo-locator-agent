# IP Geolocation Agent

## The name of this Agent on Telex is - IP Inspector

IPGeoAgent provides precise and context-rich geolocation intelligence for IP addresses. Its primary role is to deliver accurate, structured, and human-readable data about any queried IP address.

## Getting Started

### Prerequisites

- Node.js (>=20.9.0)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/okerekechinweotito/ip-geo-locator-agent.git
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```

## Usage

- To start the development server:
  ```bash
  pnpm dev
  ```
- To build the agent:
  ```bash
  pnpm build
  ```
- To start the agent in production mode:
  ```bash
  pnpm start
  ```

When you run the agent locally, it will be available at:

- **Playground**: `http://localhost:4111/`
- **API Docs**: `http://localhost:4111/api`

## A2A (Agent-to-Agent) Endpoint

The agent exposes an A2A endpoint for programmatic access.

**Endpoint URL**: `https://ip-inspector.mastra.cloud/a2a/agent/IPGeoAgent`

### Sample Request

```json
{
  "jsonrpc": "2.0",
  "id": "test-001",
  "method": "message/send",
  "params": {
    "message": {
      "kind": "message",
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "177.9.144.1"
        }
      ],
      "messageId": "msg-001",
      "taskId": "task-001"
    },
    "configuration": {
      "blocking": true
    }
  }
}
```

### Sample Response

```json
{
  "jsonrpc": "2.0",
  "id": "test-001",
  "result": {
    "id": "97c810ce-a454-4f76-bee0-5c439fa7f7a7",
    "contextId": "4cf991aa-c7bc-4e73-a0ab-fd709bca82ac",
    "status": {
      "state": "completed",
      "timestamp": "2025-11-01T11:42:42.933Z",
      "message": {
        "messageId": "91dcb03e-29f7-42d0-a114-7f65acf969f3",
        "role": "agent",
        "parts": [
          {
            "kind": "text",
            "text": "Well hello there! Let's uncover the story behind the IP address 177.9.144.1. 📍\n\nThis IP address hails from the vibrant country of **Brazil** 🇧🇷, specifically in the **State of São Paulo**, within the city of **Jardim Textil**. It's quite the journey, isn't it?\n\nDigging a bit deeper, we see that this IP is under the wing of **TELEFÔNICA BRASIL S.A**, with the ASN of **AS27699**. Their domain is telefonica.com.br, so it seems like a pretty well-connected spot!\n\nGeographically, you're looking at a latitude of -23.5573402 and a longitude of -46.5457536. The timezone there is America/Sao_Paulo, with a UTC offset of -03:00. If you were to give them a ring, the calling code for Brazil is 55.\n\nAnd for those who love to know their neighbors, Brazil shares its borders with AR, BO, CO, GF, GY, PE, PY, SR, UY, VE. Quite the bustling continent of South America!"
          }
        ],
        "kind": "message"
      }
    },
    "artifacts": [
      {
        "artifactId": "bca3cd93-1bc6-4aa3-90fc-dbb8b0107c8b",
        "name": "IPGeoAgentResponse",
        "parts": [
          {
            "kind": "text",
            "text": "Well hello there! Let's uncover the story behind the IP address 177.9.144.1. 📍\n\nThis IP address hails from the vibrant country of **Brazil** 🇧🇷, specifically in the **State of São Paulo**, within the city of **Jardim Textil**. It's quite the journey, isn't it?\n\nDigging a bit deeper, we see that this IP is under the wing of **TELEFÔNICA BRASIL S.A**, with the ASN of **AS27699**. Their domain is telefonica.com.br, so it seems like a pretty well-connected spot!\n\nGeographically, you're looking at a latitude of -23.5573402 and a longitude of -46.5457536. The timezone there is America/Sao_Paulo, with a UTC offset of -03:00. If you were to give them a ring, the calling code for Brazil is 55.\n\nAnd for those who love to know their neighbors, Brazil shares its borders with AR, BO, CO, GF, GY, PE, PY, SR, UY, VE. Quite the bustling continent of South America!"
          }
        ]
      },
      {
        "artifactId": "cbb62f10-a1ff-49a8-bec6-81180729c2ed",
        "name": "ToolResults",
        "parts": [
          {
            "kind": "data",
            "data": {
              "type": "tool-result",
              "runId": "57470fa2-b02a-4b9e-998b-092e9da08a6f",
              "from": "AGENT",
              "payload": {
                "args": {
                  "location": "177.9.144.1"
                },
                "toolCallId": "71LGAPkoq742F31B",
                "toolName": "IPGeoTool",
                "result": {
                  "ip": "177.9.144.1",
                  "success": true,
                  "type": "IPv4",
                  "continent": "South America",
                  "continent_code": "SA",
                  "country": "Brazil",
                  "country_code": "BR",
                  "region": "State of São Paulo",
                  "region_code": "SP",
                  "city": "Jardim Textil",
                  "latitude": -23.5573402,
                  "longitude": -46.5457536,
                  "is_eu": false,
                  "postal": "08551-347",
                  "calling_code": "55",
                  "capital": "Brasília",
                  "borders": "AR,BO,CO,GF,GY,PE,PY,SR,UY,VE",
                  "flag": {
                    "img": "https://cdn.ipwhois.io/flags/br.svg",
                    "emoji": "🇧🇷",
                    "emoji_unicode": "U+1F1E7 U+1F1F7"
                  },
                  "connection": {
                    "asn": 27699,
                    "org": "TELEF NICA BRASIL S.A",
                    "isp": "TELEF NICA BRASIL S.A",
                    "domain": "telefonica.com.br"
                  },
                  "timezone": {
                    "id": "America/Sao_Paulo",
                    "abbr": "-03",
                    "is_dst": false,
                    "offset": -10800,
                    "utc": "-03:00",
                    "current_time": "2025-11-01T08:42:39-03:00"
                  }
                },
                "providerMetadata": {
                  "google": {
                    "thoughtSignature": "CikB0e2Kb7MwnfNIgvlfHrA+zr83ZvuLW59rvSHd6xfe3FdYR0ch4rZ1lwpFAdHtim8gSsQhm9JOcko5OszOwKzECKh2r+bgQyphuKYt9p3d5umbkEmIFhgh0AuoGRbDBdJqyp2Xb9TUehWXgSbMk7eiCpECAdHtim9+hxpv6lrHEIIsHMo8v3XQeZrmPc17VKebdXpXwqlJNPeUskpWWPjfaAcknudc9IasqVT4ijGh/T+e8VKYlK8vuGnHmuQfjyZK06LlXjV/4xnSbwWtmGGr4Ju3OzU8VhHmhMZaGJwy7ZmWmGaLEIZ+VosZPEq956DFdfMrX2Z0VfTEZi9AnJOe7gQzZP5qgTyvJZgQO468nKGJadHbCnCawr748Bp4qZM+1gp1MfMMWLcNIiS3Yq8wnyx9ApULEbuAU9dafEpgdgqeUsKTB5714MBblBPfKAGzbfur0AuTMvlb4ocHy7sK9kw9n6XaSbwtgQGDKahkEVwgp2zD/i/DZHUPQ2kah9r11kGrCr4BAdHtim/A4Po7P4OiPXAlGEEToujjInnKIzP2ywD4OJfqfW0J6IxMfHUvpX9PSFkSH+ciWI1clKB9aAahlcWiL4ZC0AuXGzLk4DpM/JU/4iiYSi32JNiI5fYqbzmJFTIr13vtbFs7DGd4Ha8UYqHWbIjfa0N7h+C6VDbc+zzHrh8HqVFEHd1MMKjokixnf5XUTCTBarOtZE0uEGMxRu6CTDoZr53KYOVanpnCIB51oaVswJeG+/N1cHNl4yDG9Q=="
                  }
                }
              }
            }
          }
        ]
      }
    ],
    "kind": "task"
  }
}
```

## Dependencies

- `@mastra/core`: Core Mastra framework
- `@mastra/evals`: For evaluations
- `@mastra/libsql`: For database storage
- `@mastra/loggers`: For logging
- `@mastra/memory`: For memory management
- `zod`: For data validation
