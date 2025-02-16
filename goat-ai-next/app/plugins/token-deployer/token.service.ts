import { Tool } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { erc20, Token } from "@goat-sdk/plugin-erc20";
import { DeployTokenParameters } from "./parameters";

export class TokenDeployerService {
    // @ts-ignore
    @Tool({
        name: "deploy_erc20_token",
        description: "Deploy a new ERC20 token contract"
    })
    async deployToken(walletClient: EVMWalletClient, parameters: DeployTokenParameters) {
        // @ts-ignore
        const token = new Token({
            name: parameters.name,
            symbol: parameters.symbol,
            decimals: parameters.decimals,
            initialSupply: parameters.initialSupply
        });

        const deployTx = await token.deploy(walletClient);
        const receipt = await deployTx.wait();

        return {
            success: true,
            data: {
                tokenAddress: receipt.contractAddress,
                txHash: receipt.transactionHash,
                tokenInfo: {
                    name: parameters.name,
                    symbol: parameters.symbol,
                    decimals: parameters.decimals,
                    initialSupply: parameters.initialSupply
                }
            }
        };
    }
}