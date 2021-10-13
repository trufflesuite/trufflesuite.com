import type { _ } from "hkts/src";
import type { IdObject } from "../../resources/index";
import type { Process } from "../../process";
import * as Base from "../batch";
export declare type Config = {
    assignment: {};
    properties: {};
    entry?: any;
    result?: any;
};
export declare type Assignment<C extends Config> = {
    resource: IdObject;
} & C["assignment"];
export declare type Properties<C extends Config> = C["properties"];
export declare type Structure<_C extends Config> = {
    project: IdObject<"projects">;
    collectionName: string;
    assignments: _[];
};
export declare type Breadcrumb<_C extends Config> = {
    assignmentIndex: number;
};
export declare type Input<C extends Config> = Assignment<C>;
export declare type Output<C extends Config> = Input<C> & Properties<C>;
export declare type Entry<C extends Config> = C["entry"];
export declare type Result<C extends Config> = C["result"];
export declare type Batch<C extends Config> = {
    structure: Structure<C>;
    breadcrumb: Breadcrumb<C>;
    input: Input<C>;
    output: Output<C>;
    entry: Entry<C>;
    result: Result<C>;
};
export declare type Options<C extends Config> = Omit<Base.Options<Batch<C>>, "iterate" | "find" | "initialize" | "merge">;
export declare const configure: <C extends Config>(options: Pick<import("../../meta/batch").Options<Batch<C>, Assignment<C>, Output<C>>, "process" | "extract" | "convert">) => <I extends Assignment<C>, O extends Output<C>>(options: {
    project: IdObject<"projects">;
    assignments: {
        [collectionName: string]: I[];
    };
}) => Generator<import("../../meta/process/types").GraphQlRequest | import("../../meta/process/types").Web3Request, {
    project: IdObject<"projects">;
    assignments: {
        [collectionName: string]: (I & O)[];
    };
}, any>;
