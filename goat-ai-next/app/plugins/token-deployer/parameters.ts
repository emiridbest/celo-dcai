import { z } from "zod";
import { createToolParameters } from "@goat-sdk/core";

export class DeployTokenParameters extends createToolParameters(
    z.object({
        name: z.string().describe("Token name"),
        symbol: z.string().describe("Token symbol"),
        decimals: z.number().default(18).describe("Token decimals"),
        initialSupply: z.string().describe("Initial supply in base units")
    })
) {}
