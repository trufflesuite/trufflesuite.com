import type { _ } from "hkts/src";
import type * as Common from "@truffle/compile-common";
import type { Process } from "../../process";
import * as Base from "../batch";
export declare type Config = {
    compilation: {};
    contract: {};
    source: {};
    resources: {};
    entry: any;
    result: any;
};
export declare type Resources<C extends Config> = C["resources"];
export declare type Entry<C extends Config> = C["entry"];
export declare type Result<C extends Config> = C["result"];
export declare type Source<C extends Config> = C["source"];
export declare type Contract<C extends Config> = Common.CompiledContract & C["contract"];
export declare type Compilation<C extends Config> = Common.Compilation & C["compilation"] & {
    contracts: Contract<C>[];
    sources: Source<C>[];
};
export declare namespace Compilations {
    type Structure<_C extends Config> = _[];
    type Breadcrumb<_C extends Config> = {
        compilationIndex: number;
    };
    type Batch<C extends Config> = {
        structure: Structure<C>;
        breadcrumb: Breadcrumb<C>;
        input: Compilation<C>;
        output: Compilation<C> & {
            db: Resources<C>;
        };
        entry: Entry<C>;
        result: Result<C>;
    };
    type Options<C extends Config> = Omit<Base.Options<Batch<C>>, "iterate" | "find" | "initialize" | "merge">;
    const configure: <C extends Config>(options: Pick<import("../../meta/batch").Options<Batch<C>, Compilation<C>, Common.Compilation & C["compilation"] & {
        contracts: Contract<C>[];
        sources: Source<C>[];
    } & {
        db: Resources<C>;
    }>, "process" | "extract" | "convert">) => <I extends Compilation<C>, O extends Common.Compilation & C["compilation"] & {
        contracts: Contract<C>[];
        sources: Source<C>[];
    } & {
        db: Resources<C>;
    }>(inputs: I[]) => Generator<import("../../meta/process/types").GraphQlRequest | import("../../meta/process/types").Web3Request, (I & O)[], any>;
}
export declare namespace Contracts {
    type Structure<C extends Config> = (Omit<Common.Compilation, "contracts"> & C["compilation"] & {
        contracts: (Common.CompiledContract & _)[];
    })[];
    type Breadcrumb<_C extends Config> = {
        compilationIndex: number;
        contractIndex: number;
    };
    type Batch<C extends Config> = {
        structure: Structure<C>;
        breadcrumb: Breadcrumb<C>;
        input: Contract<C>;
        output: Contract<C> & {
            db: Resources<C>;
        };
        entry: Entry<C>;
        result: Result<C>;
    };
    type Options<C extends Config> = Omit<Base.Options<Batch<C>>, "iterate" | "find" | "initialize" | "find" | "merge">;
    const configure: <C extends Config>(options: Pick<import("../../meta/batch").Options<Batch<C>, Contract<C>, Common.CompiledContract & C["contract"] & {
        db: Resources<C>;
    }>, "process" | "extract" | "convert">) => <I extends Contract<C>, O extends Common.CompiledContract & C["contract"] & {
        db: Resources<C>;
    }>(inputs: import("hkts/src").$<Pick<Common.Compilation, "db" | "sources" | "compiler" | "sourceIndexes"> & C["compilation"] & {
        contracts: (Common.CompiledContract & _)[];
    }, [I]>[]) => Generator<import("../../meta/process/types").GraphQlRequest | import("../../meta/process/types").Web3Request, import("hkts/src").$<Pick<Common.Compilation, "db" | "sources" | "compiler" | "sourceIndexes"> & C["compilation"] & {
        contracts: (Common.CompiledContract & _)[];
    }, [I & O]>[], any>;
}
