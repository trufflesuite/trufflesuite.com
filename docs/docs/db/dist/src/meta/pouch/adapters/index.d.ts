import type { Collections } from "../../collections";
import type { Generic } from "./types";
export { Generic };
import * as Base from "./base";
export { Base };
import * as Couch from "./couch";
export { Couch };
import * as Fs from "./fs";
export { Fs };
import * as Memory from "./memory";
export { Memory };
import * as Sqlite from "./sqlite";
export { Sqlite };
export declare type Adapters = {
    couch: {
        databases: typeof Couch.Databases;
        settings: Couch.DatabasesSettings;
    };
    fs: {
        databases: typeof Fs.Databases;
        settings: Fs.DatabasesSettings;
    };
    memory: {
        databases: typeof Memory.Databases;
        settings: Memory.DatabasesSettings;
    };
    sqlite: {
        databases: typeof Sqlite.Databases;
        settings: Sqlite.DatabasesSettings;
    };
};
export declare type AdapterName = Generic.AdapterName<Adapters>;
export declare type AdapterSettings<N extends AdapterName> = Generic.AdapterSettings<Adapters, N>;
export declare type AdapterConstructorOptions<C extends Collections, N extends AdapterName> = Generic.AdapterConstructorOptions<C, Adapters, N>;
export declare type AdapterConstructor<C extends Collections, N extends AdapterName> = Generic.AdapterConstructor<C, Adapters, N>;
export declare type AdapterOptions = Generic.AdapterOptions<Adapters>;
export declare type AttachOptions<N extends AdapterName = AdapterName> = Generic.AttachOptions<Adapters, N>;
export declare type ConcretizeResult<C extends Collections, N extends AdapterName> = Generic.ConcretizeResult<C, Adapters, N>;
export declare const concretize: <C extends Collections, N extends "memory" | "sqlite" | "couch" | "fs">(options?: AttachOptions<N>) => ConcretizeResult<C, N>;
