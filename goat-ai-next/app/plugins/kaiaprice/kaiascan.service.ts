// import { Tool } from "@goat-sdk/core";
// import { EVMWalletClient } from "@goat-sdk/wallet-evm";
// import { GetKaiaInfoParameters } from "./parameters";

// export class KaiaScanService {
//     constructor(private readonly apiKey: string) {}

//     private async fetchData() {
//         const response = await fetch('https://mainnet-oapi.kaiascan.io/api/v1/kaia', {
//             headers: { 
//                 'Authorization': `Bearer ${this.apiKey}`,
//                 'Accept': '*/*'
//             }
//         });
        
//         if (!response.ok) {
//             throw new Error(`Kaiascan API error: ${response.statusText}`);
//         }

//         return response.json();
//     }

//     // @ts-ignore
//     @Tool({
//         name: "kaiascan_getKaiaInfo",
//         description: "Get KAIA price and network stats from Kaiascan API"
//     })
//     async getKaiaData(walletClient: EVMWalletClient, parameters: GetKaiaInfoParameters) {
//         const data = await this.fetchData();
//         return {
//             success: true,
//             data
//         };
//     }
// }

import { Tool } from "@goat-sdk/core";
import { WalletClientBase } from "@goat-sdk/core";
import axios from "axios";

export class KaiascanService {
    constructor(private readonly apiUrl: string, private readonly apiKey: string) {}

    // @ts-ignore
    @Tool({
        name: "get_kaia_price",
        description: "Get Kaia token price information",
    })
    async getKaiaPrice(_walletClient: WalletClientBase) {
        try {
            const response = await axios.request({
                method: 'get',
                url: this.apiUrl,
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            const { klay_price } = response.data;
            
            return {
                success: true,
                data: {
                    usd_price: klay_price.usd_price,
                    market_cap: klay_price.market_cap,
                    total_supply: klay_price.total_supply,
                    volume: klay_price.volume
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
}
