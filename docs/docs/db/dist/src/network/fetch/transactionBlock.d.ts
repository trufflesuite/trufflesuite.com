import type { Process } from "../../process";
import type { DataModel } from "../../resources/index";
export declare function process(options: {
    transactionHash: string;
}): Process<DataModel.Block | undefined, {
    web3: "eth_getTransactionByHash";
}>;
