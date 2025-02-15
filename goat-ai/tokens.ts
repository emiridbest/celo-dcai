import { Token } from "@goat-sdk/plugin-erc20";


const tokens: Token[] = [
    {
        decimals: 6,
        symbol: "USDC",
        name: "USD Coin",
        chains: {
            "42220": {
                contractAddress: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B",
            },
        },
    },
    {
        decimals: 6,
        symbol: "CELO",
        name: "Celo",
        chains: {
            "42220": {
                contractAddress: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
            },
        },
    },
    {
        decimals: 6,
        symbol: "cUSD",
        name: "Celo Dollar",
        chains: {
            "42220": {
                contractAddress: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
            },
        },
    }
];

export default tokens;