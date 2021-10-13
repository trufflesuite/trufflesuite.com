import type { Provider } from "web3/providers";
import type { Collections } from "../collections";
import type { Db } from "../interface";
import type { Definitions, Processor, RequestType } from "./types";
export declare type ProcessorRunner<C extends Collections> = <A extends unknown[], T = any, R extends RequestType<C> | undefined = undefined>(processor: Processor<C, A, T, R>, ...args: A) => Promise<T>;
export declare const runForDefinitions: <C extends Collections>(_definitions: Definitions<C>) => (db: Db<C>) => {
    forProvider(provider: Provider): {
        run: ProcessorRunner<C>;
    };
    run: ProcessorRunner<C>;
};
declare const run: <C extends Collections, Args extends unknown[], Return, R extends import("./types").GraphQlRequestType<C, string> | import("./types").Web3RequestType<C, string> | undefined>(connections: {
    db: Db<C>;
    provider?: Provider | undefined;
}, processor: Processor<C, Args, Return, R>, ...args: Args) => Promise<Return>;
export {};
