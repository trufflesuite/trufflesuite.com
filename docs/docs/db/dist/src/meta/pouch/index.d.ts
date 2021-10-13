import type { Collections } from "../collections";
import type { Workspace } from "../data";
import * as Adapters from "./adapters/index";
export { Adapters };
import type { Adapter, Definition, Definitions } from "./types";
export { Adapter, Definition, Definitions };
export declare const forDefinitions: <C extends Collections>(definitions: Definitions<C>) => <N extends "memory" | "sqlite" | "couch" | "fs">(options?: Adapters.AttachOptions<N> | undefined) => Workspace<C>;
