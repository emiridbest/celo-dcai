// import { PluginBase, Chain } from "@goat-sdk/core";
// import { EVMWalletClient } from "@goat-sdk/wallet-evm";
// import { KaiaScanService } from "./kaiascan.service";

// // export interface KaiascanConfig {
//     apiKey: string;
// }

// export class KaiascanPlugin extends PluginBase<EVMWalletClient> {
//     constructor(config: KaiascanConfig) {
//         super("kaiascan", [new KaiaScanService(config.apiKey)]);
//     }

//     supportsChain = (chain: Chain) => chain.type === "evm";
// }

// export const kaiascanAPI = (config: KaiascanConfig) => new KaiascanPlugin(config);


import { Chain, PluginBase, WalletClientBase } from "@goat-sdk/core";
import { KaiascanService } from "./kaiascan.service";

export interface KaiaConfig {
    apiUrl?: string;
    apiKey: string;
}

export class KaiascanPlugin extends PluginBase<WalletClientBase> {
    constructor(config: KaiaConfig) {
        const service = new KaiascanService(
            config.apiUrl ?? "https://mainnet-oapi.kaiascan.io/api/v1/kaia",
            config.apiKey
        );
        super("kaiascanAPI", [service]);
    }
    supportsChain = (chain: Chain) => chain.type === "evm";
}

export const kaiascanAPI = (config: KaiaConfig) => new KaiascanPlugin(config);

