import type { ApolloServer } from "apollo-server";
import * as Meta from "./meta/index";
import { Collections, CollectionName, Input, Db } from "./resources/index";
/**
 * Options for connecting to @truffle/db
 *
 * ```typescript
 * type ConnectOptions = {
 *   workingDirectory: string;
 *   adapter?:
 *     | {
 *         name: "couch";
 *         settings?: Meta.Pouch.Adapters.Couch.DatabasesSettings;
 *       }
 *     | {
 *         name: "fs";
 *         settings?: Meta.Pouch.Adapters.Fs.DatabasesSettings;
 *       }
 *     | {
 *         name: "memory";
 *         settings?: Meta.Pouch.Adapters.Memory.DatabasesSettings;
 *       }
 *     | {
 *         name: "sqlite";
 *         settings?: Meta.Pouch.Adapters.Sqlite.DatabasesSettings;
 *       }
 * };
 * ```
 *
 * See individual settings interfaces:
 *   - [[Meta.Pouch.Adapters.Couch.DatabasesSettings]]
 *   - [[Meta.Pouch.Adapters.Fs.DatabasesSettings]]
 *   - [[Meta.Pouch.Adapters.Memory.DatabasesSettings]]
 *   - [[Meta.Pouch.Adapters.Sqlite.DatabasesSettings]]
 *
 * Default adapter: `{ name: "sqlite" }`
 *
 * We recommend using only `"sqlite"` and `"couch"` at this time.
 */
export declare type ConnectOptions = Meta.ConnectOptions<Collections>;
export declare const connect: (options?: ConnectOptions) => Db;
export declare const serve: (options?: ConnectOptions) => ApolloServer;
export declare type StrictIdInput<N extends CollectionName> = Meta.Id.StrictIdInput<Collections, N>;
export declare type GenerateId = <N extends CollectionName>(collectionName: N, input: StrictIdInput<N> | Input<N> | undefined) => string | undefined;
export declare const generateId: GenerateId;
export declare const schema: import("graphql").GraphQLSchema, attach: <N extends "memory" | "sqlite" | "couch" | "fs">(options?: Meta.Pouch.Adapters.AttachOptions<N> | undefined) => Meta.Workspace<Collections>, resources: Meta.Process.ResourceProcessors<Collections>, forDb: (db: Meta.Db<Collections>) => {
    forProvider(provider: import("web3/providers").Provider): {
        run: Meta.Process.ProcessorRunner<Collections>;
    };
    run: Meta.Process.ProcessorRunner<Collections>;
};
