import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { erc20, USDC } from "@goat-sdk/plugin-erc20";
import { superfluid } from "@goat-sdk/plugin-superfluid";
import { polymarket } from "@goat-sdk/plugin-polymarket";
import { viem } from "@goat-sdk/wallet-viem";
import { generateText } from "ai";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";
import { Token } from "@goat-sdk/plugin-erc20";
require("dotenv").config();
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { sendETH, } from "@goat-sdk/wallet-evm";
import { balmy } from "@goat-sdk/plugin-balmy";
import { allora } from "@goat-sdk/plugin-allora";

// import { kaiascanAPI } from '@/app/plugins/kaiaprice';
// import { tokenDeployer } from '@/app/plugins/token-deployer';

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: celo,
});


const tokens: Token[] = [
    {
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin",
        chains: {
            "42220": {
                contractAddress: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
            },
        },
    },
    {
        decimals: 6,
        symbol: "CELO",
        name: "Celo",
        chains: {
            "42220": {
                contractAddress: "0x471EcE3750Da237f93B8E339c536989b8978a438",
            },
        },
    },
    {
        decimals: 6,
        symbol: "cUSD",
        name: "Celo Dollar",
        chains: {
            "42220": {
                contractAddress: "0x765de816845861e75a25fca122bb6898b8b1282a",
            },
        },
    }
];
export async function POST(req: Request) {
    const { messages } = await req.json();
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        // @ts-ignore
        plugins: [sendETH(), erc20({ tokens }), superfluid(),allora(),balmy()],
    });

    const poly = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [
            polymarket({
                credentials: {
                    key: process.env.POLYMARKET_API_KEY as string, // API key for Polymarket operations
                    secret: process.env.POLYMARKET_SECRET as string, // API secret for authentication
                    passphrase: process.env.POLYMARKET_PASSPHRASE as string, // API passphrase for security
                },
            }),
        ],
    });

    const result = streamText({
        model: openai("gpt-4o-mini"),
        system: "You are a helpful agent that performs onchain transactions like sending celo,cusd, implement dolar-cost-averaging using balmy protocol, tokens etc and provides onchain advice based on data given",
        tools: tools,
        maxSteps: 5,
        messages,
    });

    return result.toDataStreamResponse();
}