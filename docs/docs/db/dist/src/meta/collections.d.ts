export declare type Collections = {
    [collectionName: string]: {
        resource: {
            id: string;
        };
        idFields: string[];
        input: object;
        names: {
            [S in CollectionNameStyle]: string;
        };
    } & ({
        resource: {
            name: string;
        };
        named: true;
    } | {
        named?: false;
    }) & ({
        mutable: true;
    } | {
        mutable?: false;
    });
};
export declare type CollectionName<C extends Collections> = string & keyof C;
export declare type Collection<C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>> = {
    [K in N]: C[K];
}[N];
export declare type CollectionPropertyFilter = {
    extends: any;
};
export declare type CollectionPropertyName<F extends CollectionPropertyFilter = CollectionPropertyFilter> = {
    [P in string & keyof Collection<Collections>]: F["extends"] extends CollectionProperty<P, Collections> ? P : never;
}[string & keyof Collection<Collections>];
export declare type CollectionProperty<P extends CollectionPropertyName, C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>> = Collection<C, N>[P];
export declare type CollectionNameStyle = "resource" | "Resource" | "resources" | "Resources" | "resourcesMutate" | "ResourcesMutate";
export declare type CollectionNameStyledAs<S extends CollectionNameStyle, C extends Collections, N extends CollectionName<C>> = CollectionProperty<"names", C, N>[S];
export declare type ResourceFilter = {
    is: CollectionPropertyName<{
        extends: boolean;
    }>;
};
export declare type Resource<C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>, F = undefined> = F extends ResourceFilter ? Extract<Collection<C, N>, {
    [K in F["is"]]: true;
}> extends never ? never : Extract<Collection<C, N>, {
    [K in F["is"]]: true;
}>["resource"] : CollectionProperty<"resource", C, N>;
export declare type Input<C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>> = CollectionProperty<"input", C, N>;
export declare type SavedInput<C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>> = {
    [K in keyof Input<C, N> | "id"]: K extends "id" ? string : K extends keyof Input<C, N> ? Input<C, N>[K] : never;
};
export declare type IdFields<C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>> = CollectionProperty<"idFields", C, N>;
export declare type FilteredCollectionName<C extends Collections, F = undefined> = {
    [K in CollectionName<C>]: Resource<C, K, F> extends never ? never : K;
}[CollectionName<C>];
export declare type MutableResource<C extends Collections, N extends CollectionName<C> = CollectionName<C>> = Resource<C, N, {
    is: "mutable";
}>;
export declare type MutableCollectionName<C extends Collections> = FilteredCollectionName<C, {
    is: "mutable";
}>;
export declare type NamedResource<C extends Collections = Collections, N extends CollectionName<C> = CollectionName<C>> = Resource<C, N, {
    is: "named";
}>;
export declare type NamedCollectionName<C extends Collections> = FilteredCollectionName<C, {
    is: "named";
}>;
export declare type MutationInput<C extends Collections, N extends CollectionName<C>> = {
    [K in N]: Input<C, N>[];
};
export declare type MutationPayload<C extends Collections, N extends CollectionName<C>> = {
    [K in N]: Resource<C, N>[];
};
