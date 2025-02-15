import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";

if (!process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY) {
    throw new Error("Wallet private key is not defined in environment variables");
}

export const account = privateKeyToAccount(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY as `0x${string}`);

export const walletClient = createWalletClient({
    account,
    transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL || 'https://forno.celo.org'),
    chain: celo,
});