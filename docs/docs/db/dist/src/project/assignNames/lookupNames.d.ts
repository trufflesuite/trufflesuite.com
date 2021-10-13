import type { IdObject } from "../../resources/index";
import * as Batch from "./batch";
export declare const process: <I extends {
    resource: import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.Source> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.Bytecode> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.Compilation> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.ContractInstance> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.Contract> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.NameRecord> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.Network> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.Project> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.ProjectName> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", _DataModel.NetworkGenealogy> | import("../../meta/index").IdObject<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies", import("../../meta").SavedInput<import("../../resources").Collections, "sources" | "bytecodes" | "compilations" | "contractInstances" | "contracts" | "nameRecords" | "networks" | "projects" | "projectNames" | "networkGenealogies">>;
}, O extends Batch.Output<{
    assignment: {};
    properties: {
        name: string;
        type: string;
    };
    entry: IdObject;
    result: {
        name: string;
        type: string;
    };
}>>(options: {
    project: import("../../meta/index").IdObject<import("../../resources").Collections, "projects", _DataModel.Project> | import("../../meta/index").IdObject<import("../../resources").Collections, "projects", import("../../meta").SavedInput<import("../../resources").Collections, "projects">>;
    assignments: {
        [collectionName: string]: I[];
    };
}) => Generator<import("../../meta/process/types").GraphQlRequest | import("../../meta/process/types").Web3Request, {
    project: import("../../meta/index").IdObject<import("../../resources").Collections, "projects", _DataModel.Project> | import("../../meta/index").IdObject<import("../../resources").Collections, "projects", import("../../meta").SavedInput<import("../../resources").Collections, "projects">>;
    assignments: {
        [collectionName: string]: (I & O)[];
    };
}, any>;
