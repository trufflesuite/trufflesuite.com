import type { Collections, CollectionName, IdFields } from "../collections";
/**
 * @category Definitions
 */
export declare type Definitions<C extends Collections> = {
    [N in CollectionName<C>]: Definition<C, N>;
};
/**
 * @category Definitions
 */
export declare type Definition<C extends Collections, N extends CollectionName<C>> = {
    idFields: IdFields<C, N>;
};
