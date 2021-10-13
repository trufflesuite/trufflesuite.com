import type { Collections, CollectionName } from "./collections";
import type * as Graph from "./graph/index";
import type * as Pouch from "./pouch/index";
import type * as Process from "./process/index";
import type * as Id from "./id/index";
/**
 * Definitions type for whole meta system
 *
 * @category Definitions
 */
export declare type Definitions<C extends Collections> = {
    [N in CollectionName<C>]: Definition<C, N>;
};
/**
 * Main Definition type for whole meta system
 *
 * Each definition for a given [[CollectionName]] must adhere to the
 * [[Graph.Definition]], [[Pouch.Definition]], and [[Process.Definition]]
 * definition type for that name.
 *
 * @category Definitions
 */
export declare type Definition<C extends Collections, N extends CollectionName<C>> = Graph.Definition<C, N> & Process.Definition<C, N> & Pouch.Definition<C, N> & Id.Definition<C, N>;
