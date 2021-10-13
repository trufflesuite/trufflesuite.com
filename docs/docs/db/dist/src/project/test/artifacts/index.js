"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactsLoader = void 0;
const logger_1 = require("../../../logger");
const debug = logger_1.logger("db:project:test:artifacts");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const config_1 = __importDefault(require("@truffle/config"));
const resolver_1 = __importDefault(require("@truffle/resolver"));
const environment_1 = require("@truffle/environment");
const project_1 = require("../../index");
const resources_1 = require("../../../resources/index");
const process_1 = require("../../../process");
class ArtifactsLoader {
    constructor(db, config) {
        this.db = db;
        // @ts-ignore
        this.compilationConfig = config;
        // @ts-ignore
        this.resolver = new resolver_1.default(config);
    }
    load(result) {
        return __awaiter(this, void 0, void 0, function* () {
            debug("Initializing project...");
            const project = yield project_1.initialize({
                project: {
                    directory: this.compilationConfig.working_directory
                },
                db: this.db
            });
            debug("Initialized project.");
            debug("Loading compilations...");
            const loadedResult = yield project.loadCompile({ result });
            debug("Loaded compilations.");
            const contracts = loadedResult.contracts.map(({ db: { contract } }) => contract);
            debug("Assigning contract names...");
            yield project.assignNames({ assignments: { contracts } });
            debug("Assigned contract names.");
            const artifacts = yield this.collectArtifacts(project, contracts);
            const config = config_1.default.detect({
                working_directory: this.compilationConfig["contracts_directory"]
            });
            debug("Loading networks...");
            const networks = [];
            for (const name of Object.keys(config.networks)) {
                try {
                    debug("Connecting to network name: %s", name);
                    config.network = name;
                    yield environment_1.Environment.detect(config);
                    const result = yield project
                        .connect({ provider: config.provider })
                        .loadMigrate({
                        network: { name },
                        // @ts-ignore
                        artifacts
                    });
                    networks.push(result.network);
                }
                catch (error) {
                    debug("error %o", error);
                    continue;
                }
            }
            debug("Loaded networks.");
            debug("Assigning network names...");
            yield project.assignNames({ assignments: { networks } });
            debug("Assigned network names.");
        });
    }
    collectArtifacts(project, contractIdObjects) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = contractIdObjects.map(({ id }) => id);
            // get full representation
            debug("Retrieving contracts, ids: %o...", ids);
            const contracts = yield project.run(process_1.resources.find, "contracts", ids, graphql_tag_1.default `
        fragment ContractNameAndBytecodes on Contract {
          id
          name
          callBytecode {
            id
          }
          createBytecode {
            id
          }
        }
      `);
            // and resolve artifact
            return contracts.map((contract) => {
                const { name, callBytecode, createBytecode } = contract;
                debug("Requiring artifact for %s...", name);
                // @ts-ignore
                const artifact = this.resolver.require(name)._json;
                debug("Required artifact for %s.", name);
                artifact.db = {
                    contract: resources_1.toIdObject(contract),
                    callBytecode: resources_1.toIdObject(callBytecode),
                    createBytecode: resources_1.toIdObject(createBytecode)
                };
                return artifact;
            });
        });
    }
}
exports.ArtifactsLoader = ArtifactsLoader;
//# sourceMappingURL=index.js.map