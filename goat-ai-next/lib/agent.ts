import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { erc20 } from "@goat-sdk/plugin-erc20";
import { superfluid } from "@goat-sdk/plugin-superfluid";
//import { polymarket } from "@goat-sdk/plugin-polymarket";
import { viem } from "@goat-sdk/wallet-viem";
import { generateText } from "ai";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";
import { tokens } from "./token";
export const apiKey =process.env.NEXT_PUBLIX_OPENAI_API_KEY;
if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    throw new Error("NEXT_PUBLIC_OPENAI_API_KEY is not defined in .env file");
}

export async function generateAIResponse(prompt: string) {
    const account = privateKeyToAccount(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY as `0x${string}`);

    const walletClient = createWalletClient({
        account: account,
        transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
        chain: celo,
    });
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [erc20({ tokens }), superfluid()]
    });

    try {
        const result = await generateText({
            model: openai("gpt-4-mini"),
            tools: tools,
            maxSteps: 10,
            prompt: prompt,
        });
        return result.text;
    } catch (error) {
        console.error('AI Response Error:', error);
        throw new Error('Failed to generate AI response');
    }
}