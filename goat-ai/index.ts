import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { erc20 } from "@goat-sdk/plugin-erc20";
import { superfluid } from "@goat-sdk/plugin-superfluid";
import { polymarket } from "@goat-sdk/plugin-polymarket";
import { viem } from "@goat-sdk/wallet-viem";
import { generateText } from "ai";
import dotenv from "dotenv";
import readline from "node:readline";;
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";
import { Token } from "@goat-sdk/plugin-erc20";

dotenv.config();


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

export default tokens;
if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error("WALLET_PRIVATE_KEY is not defined in .env file");
}

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
export  const apikey=process.env.OPENAI_API_KEY;
const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: celo,
});

(async () => {
    const tools = await getOnChainTools({
        wallet: viem(walletClient),
        plugins: [erc20({ tokens }), superfluid()]
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

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    while (true) {
        const prompt = await new Promise<string>((resolve) => {
            rl.question('Enter your prompt(or "exit" to quit): ', resolve);
        });

        if (prompt === "exit") {
            rl.close();
            break;
        }
        try {
            const result = await generateText({
                model: openai("gpt-4o-mini"),
                tools: tools,
                maxSteps: 10,
                prompt: prompt,
                onStepFinish: (event) => {
                    console.log(event.toolResults);
                },
            });
            console.log(result.text);
        } catch (error) {
            console.error(error);
        }
        console.log("\n---------------------\n")

    }
})();
