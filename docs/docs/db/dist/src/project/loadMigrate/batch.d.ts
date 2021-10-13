import type { _ } from "hkts/src";
import type { ContractObject, NetworkObject } from "@truffle/contract-schema/spec";
import type { IdObject } from "../../resources/index";
import type { Process } from "../../process";
import * as Base from "../batch";
export declare type Config = {
    network?: {};
    artifact?: {};
    requires?: {};
    produces: {} | undefined;
    entry: any;
    result: any;
};
export declare type Network<C extends Config> = C["network"] & {
    networkId: string;
};
export declare type Requires<C extends Config> = "requires" extends keyof C ? C["requires"] : {};
export declare type Produces<C extends Config> = C["produces"];
export declare type Entry<C extends Config> = C["entry"];
export declare type Result<C extends Config> = C["result"];
export declare type ArtifactNetwork<C extends Config> = NetworkObject & Requires<C>;
export declare type Artifact<C extends Config> = ContractObject & C["artifact"] & {
    db: {
        contract: IdObject<"contracts">;
        callBytecode: IdObject<"bytecodes">;
        createBytecode: IdObject<"bytecodes">;
    };
    networks?: {
        [networkId: string]: ArtifactNetwork<C>;
    };
};
export declare type Input<C extends Config> = ArtifactNetwork<C>;
export declare type Output<C extends Config> = Input<C> & Produces<C>;
export declare type Structure<C extends Config> = {
    network: Network<C>;
    artifacts: (ContractObject & Artifact<C> & {
        db: {
            contract: IdObject<"contracts">;
            callBytecode: IdObject<"bytecodes">;
            createBytecode: IdObject<"bytecodes">;
        };
        networks?: {
            [networkId: string]: _;
        };
    })[];
};
export declare type Breadcrumb<_C extends Config> = {
    artifactIndex: number;
};
export declare type Batch<C extends Config> = {
    structure: Structure<C>;
    breadcrumb: Breadcrumb<C>;
    input: Input<C>;
    output: Output<C>;
    entry: Entry<C>;
    result: Result<C>;
};
export declare type Options<C extends Config> = Omit<Base.Options<Batch<C>>, "iterate" | "find" | "initialize" | "merge">;
export declare const configure: <C extends Config>(options: Pick<import("../../meta/batch").Options<Batch<C>, ArtifactNetwork<C>, Output<C>>, "process" | "extract" | "convert">) => <I extends ArtifactNetwork<C>, O extends Output<C>>(inputs: {
    network: import("hkts/src").$<Network<C>, [I]>;
    artifacts: import("hkts/src").$<ContractObject & C["artifact"] & {
        db: {
            contract: IdObject<"contracts">;
            callBytecode: IdObject<"bytecodes">;
            createBytecode: IdObject<"bytecodes">;
        };
        networks?: {
            [networkId: string]: ArtifactNetwork<C>;
        } | undefined;
    } & {
        db: {
            contract: IdObject<"contracts">;
            callBytecode: IdObject<"bytecodes">;
            createBytecode: IdObject<"bytecodes">;
        };
        networks?: {
            [networkId: string]: _<0>;
        } | undefined;
    }, [I]>[];
}) => Generator<import("../../meta/process/types").GraphQlRequest | import("../../meta/process/types").Web3Request, {
    network: import("hkts/src").$<Network<C>, [I & O]>;
    artifacts: import("hkts/src").$<ContractObject & C["artifact"] & {
        db: {
            contract: IdObject<"contracts">;
            callBytecode: IdObject<"bytecodes">;
            createBytecode: IdObject<"bytecodes">;
        };
        networks?: {
            [networkId: string]: ArtifactNetwork<C>;
        } | undefined;
    } & {
        db: {
            contract: IdObject<"contracts">;
            callBytecode: IdObject<"bytecodes">;
            createBytecode: IdObject<"bytecodes">;
        };
        networks?: {
            [networkId: string]: _<0>;
        } | undefined;
    }, [I & O]>[];
}, any>;
