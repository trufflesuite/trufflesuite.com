import Config from "@truffle/config";
import { Db } from "../../../resources/index";
import { WorkflowCompileResult } from "@truffle/compile-common/src/types";
export declare class ArtifactsLoader {
    private db;
    private compilationConfig;
    private resolver;
    constructor(db: Db, config?: Partial<Config>);
    load(result: WorkflowCompileResult): Promise<void>;
    private collectArtifacts;
}
