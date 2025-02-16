require("dotenv").config();

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { kairos } from "viem/chains";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { erc20, USDC } from "@goat-sdk/plugin-erc20";

import { sendETH,  } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { allora } from "@goat-sdk/plugin-allora";
import { kaiascanAPI } from '../../plugins/kaiaprice/index';
// import { kaiascanAPI } from '@/app/plugins/kaiaprice';
// import { tokenDeployer } from '@/app/plugins/token-deployer';

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: kairos,
});

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const KCT = {
        decimals: 18,
        symbol: "KCT",
        name: "KCT",
        chains: {
            "1001": {
                contractAddress: "0x5c033793abf68058e5abcd174bbadb50ccd24f06" as `0x${string}`,
            },
        },
    };
     
    // I want you to send 0.000001 KAIA to 0x1C42aCcd92d491DB8b083Fa953B5E3D9A9E42aD5 and return the tx id
    // I want you to send 10 KCT to 0x2330384317C95372875AD81d5D6143E7735714A5 and return anything 
    // I want you to tell me my KCT token balance and return the balance for this address: 0x1C42aCcd92d491DB8b083Fa953B5E3D9A9E42aD5
    // I want you to retrieve the KCT balance of this address: 0x2330384317C95372875AD81d5D6143E7735714A5
    // Can you predict the price of KAIA in 8 hours and make a recommendation as to whether I should buy or sell?

    const tools = await getOnChainTools({
        // @ts-ignore
        wallet: viem(walletClient),
        // @ts-ignore
        plugins: [sendETH(), erc20({
            tokens: [USDC, KCT],
        }), allora({apiKey: process.env.ALLORA_API_KEY}), kaiascanAPI({
            apiKey: process.env.KAIASCAN_API_KEY || '',
        })],
    });

    const result = streamText({
        // @ts-ignore
        model: google('gemini-1.5-flash-8b'),
        system: "You are a helpful agent that performs onchain transactions like sending Kaia, tokens etc and provides onchain advice based on data given",
        tools: tools,
        maxSteps: 5,
        messages,
    })

    return result.toDataStreamResponse();
}