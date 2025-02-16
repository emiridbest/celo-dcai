import { PluginBase, Chain } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { TokenDeployerService } from "./token.service";

export class TokenDeployerPlugin extends PluginBase<EVMWalletClient> {
    constructor() {
        super("tokenDeployer", [new TokenDeployerService()]);
    }

    supportsChain = (chain: Chain) => chain.type === "evm";
}

export const tokenDeployer = () => new TokenDeployerPlugin();