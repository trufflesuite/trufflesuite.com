"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const logger_1 = require("../../logger");
const debug = logger_1.logger("db:project:test:integration");
const path_1 = __importDefault(require("path"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const db_1 = require("../../index");
const artifacts_1 = require("./artifacts/index");
const system_1 = require("../../system");
const migrate_1 = __importDefault(require("@truffle/migrate"));
const environment_1 = require("@truffle/environment");
const config_1 = __importDefault(require("@truffle/config"));
const ganache_core_1 = __importDefault(require("ganache-core"));
const web3_1 = __importDefault(require("web3"));
const fse = __importStar(require("fs-extra"));
const tmp = __importStar(require("tmp"));
const compile_common_1 = require("@truffle/compile-common");
let server;
const port = 8545;
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    server = ganache_core_1.default.server();
    server.listen(port, done);
}));
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    tempDir.removeCallback();
    setTimeout(() => server.close(done), 500);
}));
const compilationResult = require(path_1.default.join(__dirname, "workflowCompileOutputMock", "compilationOutput.json"));
const tempDir = tmp.dirSync({ unsafeCleanup: true });
tmp.setGracefulCleanup();
const compilationConfig = {
    contracts_directory: path_1.default.join(__dirname, "compilationSources"),
    contracts_build_directory: path_1.default.join(__dirname, "compilationSources", "build", "contracts"),
    working_directory: tempDir.name,
    all: true
};
const migratedArtifacts = [
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "MagicSquare.json")),
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "Migrations.json")),
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "SquareLib.json")),
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "VyperStorage.json"))
];
const migrationFileNames = [
    "MagicSquare.json",
    "Migrations.json",
    "SquareLib.json",
    "VyperStorage.json"
];
const migrationConfig = config_1.default.detect({
    workingDirectory: path_1.default.join(__dirname, "compilationSources")
});
migrationConfig.network = "development";
const db = db_1.connect({
    adapter: {
        name: "memory"
    }
});
const artifacts = [
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "MagicSquare.json")),
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "Migrations.json")),
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "SquareLib.json")),
    require(path_1.default.join(__dirname, "compilationSources", "build", "contracts", "VyperStorage.json"))
];
const AddProjects = graphql_tag_1.default `
  mutation AddProjects($projects: [ProjectInput!]!) {
    projectsAdd(input: { projects: $projects }) {
      projects {
        id
        directory
      }
    }
  }
`;
const AddNameRecords = graphql_tag_1.default `
  mutation AddNameRecords($nameRecords: [NameRecordInput!]!) {
    nameRecordsAdd(input: { nameRecords: $nameRecords }) {
      nameRecords {
        id
        resource {
          name
        }
        previous {
          id
        }
      }
    }
  }
`;
const AssignProjectNames = graphql_tag_1.default `
  mutation AssignProjectNames($projectNames: [ProjectNameInput!]!) {
    projectNamesAssign(input: { projectNames: $projectNames }) {
      projectNames {
        key {
          name
          type
        }
        nameRecord {
          resource {
            id
          }
        }
      }
    }
  }
`;
const ResolveProjectName = graphql_tag_1.default `
  query ResolveProjectName($projectId: ID!, $type: String!, $name: String!) {
    project(id: $projectId) {
      resolve(type: $type, name: $name) {
        id
        resource {
          id
          name
        }
      }
    }
  }
`;
const AddContracts = graphql_tag_1.default `
  mutation AddContracts($contracts: [ContractInput!]!) {
    contractsAdd(input: { contracts: $contracts }) {
      contracts {
        id
        name
        abi {
          json
        }
        processedSource {
          source {
            contents
            sourcePath
          }
          ast {
            json
          }
          language
        }
        compilation {
          compiler {
            name
            version
          }
          contracts {
            name
            source {
              contents
              sourcePath
            }
            ast {
              json
            }
          }
          sources {
            contents
            sourcePath
          }
        }
        createBytecode {
          id
          bytes
          linkReferences {
            offsets
            name
            length
          }
        }
        callBytecode {
          id
          bytes
          linkReferences {
            offsets
            name
            length
          }
        }
        callBytecodeGeneratedSources {
          source {
            sourcePath
          }
        }
        createBytecodeGeneratedSources {
          source {
            sourcePath
          }
        }
      }
    }
  }
`;
const GetWorkspaceBytecode = graphql_tag_1.default `
  query GetWorkspaceBytecode($id: ID!) {
    bytecode(id: $id) {
      id
      bytes
      linkReferences {
        offsets
        name
        length
      }
    }
  }
`;
const GetWorkspaceSource = graphql_tag_1.default `
  query GetWorkspaceSource($id: ID!) {
    source(id: $id) {
      id
      contents
      sourcePath
    }
  }
`;
const GetWorkspaceContract = graphql_tag_1.default `
  query GetWorkspaceContract($id: ID!) {
    contract(id: $id) {
      id
      name
      abi {
        json
      }
      createBytecode {
        bytes
      }
      callBytecode {
        bytes
      }
      processedSource {
        source {
          contents
          sourcePath
        }
        ast {
          json
        }
      }
      callBytecodeGeneratedSources {
        source {
          sourcePath
          contents
        }
        ast {
          json
        }
        language
      }
      createBytecodeGeneratedSources {
        source {
          sourcePath
        }
      }
      compilation {
        compiler {
          name
          version
        }
        sources {
          contents
          sourcePath
        }
        processedSources {
          source {
            contents
            sourcePath
          }
          language
        }
      }
    }
  }
`;
const GetWorkspaceCompilation = graphql_tag_1.default `
  query getWorkspaceCompilation($id: ID!) {
    compilation(id: $id) {
      compiler {
        name
        version
      }
      processedSources {
        source {
          contents
          sourcePath
        }
        ast {
          json
        }
        language
      }
      sources {
        id
        contents
        sourcePath
      }
      sourceMaps {
        data
      }
      immutableReferences {
        astNode
        bytecode {
          bytes
        }
        length
        offsets
      }
    }
  }
`;
const GetWorkspaceNetwork = graphql_tag_1.default `
  query GetWorkspaceNetwork($id: ID!) {
    network(id: $id) {
      networkId
      id
      name
      historicBlock {
        height
        hash
      }
    }
  }
`;
const GetWorkspaceContractInstance = graphql_tag_1.default `
  query GetContractInstance($id: ID!) {
    contractInstance(id: $id) {
      address
      network {
        networkId
      }
      contract {
        name
      }
      creation {
        transactionHash
        constructor {
          createBytecode {
            bytecode {
              bytes
              linkReferences {
                offsets
                name
                length
              }
            }
          }
        }
      }
      callBytecode {
        bytecode {
          bytes
          linkReferences {
            offsets
            name
            length
          }
        }
      }
    }
  }
`;
describe("Compilation", () => {
    let sourceIds = [];
    let bytecodeIds = [];
    let callBytecodeIds = [];
    let compilationIds = [];
    let netIds = [];
    let migratedNetworks = [];
    let contractIds = [];
    let contractInstanceIds = [];
    let contractInstances = [];
    let expectedSolcCompilationId;
    let expectedVyperCompilationId;
    let contractNameRecordId;
    let previousContractNameRecord;
    let previousContractExpectedId;
    let expectedProjectId;
    let projectId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield environment_1.Environment.detect(migrationConfig);
        const web3 = new web3_1.default(migrationConfig.provider);
        const networkId = yield web3.eth.net.getId();
        migrationConfig.reset = true;
        yield migrate_1.default.run(migrationConfig);
        sourceIds = artifacts.map(artifact => ({
            id: system_1.generateId("sources", {
                contents: artifact["source"],
                sourcePath: artifact["sourcePath"]
            })
        }));
        bytecodeIds = artifacts.map(artifact => ({
            id: system_1.generateId("bytecodes", compile_common_1.Shims.LegacyToNew.forBytecode(artifact["bytecode"]))
        }));
        callBytecodeIds = artifacts.map(artifact => ({
            id: system_1.generateId("bytecodes", compile_common_1.Shims.LegacyToNew.forBytecode(artifact["deployedBytecode"]))
        }));
        expectedSolcCompilationId = system_1.generateId("compilations", {
            compiler: artifacts[0].compiler,
            sources: [sourceIds[0], sourceIds[1], sourceIds[2]]
        });
        expectedVyperCompilationId = system_1.generateId("compilations", {
            compiler: artifacts[3].compiler,
            sources: [sourceIds[3]]
        });
        compilationIds.push({ id: expectedSolcCompilationId }, { id: expectedVyperCompilationId });
        expectedProjectId = system_1.generateId("projects", {
            directory: compilationConfig["working_directory"]
        });
        yield Promise.all(artifacts.map((contract, index) => __awaiter(void 0, void 0, void 0, function* () {
            const shimBytecodeObject = compile_common_1.Shims.LegacyToNew.forBytecode(contract["bytecode"]);
            const shimCallBytecodeObject = compile_common_1.Shims.LegacyToNew.forBytecode(contract["deployedBytecode"]);
            // @ts-ignore won't be undefined
            let bytecodeId = system_1.generateId("bytecodes", shimBytecodeObject);
            let callBytecodeId = system_1.generateId("bytecodes", shimCallBytecodeObject);
            // @ts-ignore won't be updefined
            let contractId = system_1.generateId("contracts", {
                name: artifacts[index].contractName,
                abi: { json: JSON.stringify(artifacts[index].abi) },
                processedSource: {
                    index: artifacts[index].compiler.name === "solc" ? +index : 0
                },
                compilation: {
                    id: artifacts[index].compiler.name === "solc"
                        ? expectedSolcCompilationId
                        : expectedVyperCompilationId
                }
            });
            contractIds.push({
                id: contractId
            });
            const networksPath = fse
                .readFileSync(path_1.default.join(__dirname, "compilationSources", "build", "contracts", migrationFileNames[index]))
                .toString();
            let networks = JSON.parse(networksPath.toString()).networks;
            const networksArray = Object.entries(networks);
            if (networksArray.length > 0) {
                const links = networksArray[networksArray.length - 1][1]["links"];
                const transaction = yield web3.eth.getTransaction(networksArray[networksArray.length - 1][1]["transactionHash"]);
                const historicBlock = {
                    height: transaction.blockNumber,
                    hash: transaction.blockHash
                };
                const netId = system_1.generateId("networks", {
                    networkId: networkId,
                    historicBlock: historicBlock
                });
                debug("netId %o", netId);
                netIds.push({ id: netId });
                migratedNetworks.push({
                    networkId: networkId,
                    historicBlock: historicBlock,
                    links: links
                });
                const contractInstanceId = system_1.generateId("contractInstances", {
                    contract: { id: contractId },
                    address: networksArray[networksArray.length - 1][1]["address"],
                    creation: {
                        transactionHash: networksArray[networksArray.length - 1][1]["transactionHash"],
                        constructor: {
                            createBytecode: {
                                bytecode: { id: bytecodeId },
                                linkValues: shimBytecodeObject.linkReferences
                                    .filter((linkReference) => !!linkReference.name)
                                    .map(({ name }, index) => ({
                                    // @ts-ignore name won't be null because filter
                                    value: links[name],
                                    linkReference: {
                                        bytecode: { id: bytecodeId },
                                        index
                                    }
                                }))
                            }
                        }
                    }
                });
                contractInstanceIds.push({ id: contractInstanceId });
                contractInstances.push({
                    address: networksArray[networksArray.length - 1][1]["address"],
                    network: {
                        name: "development",
                        networkId: networkId,
                        historicBlock: historicBlock
                    },
                    contract: {
                        name: contract["contractName"]
                    },
                    creation: {
                        transactionHash: networksArray[networksArray.length - 1][1]["transactionHash"],
                        constructor: {
                            createBytecode: {
                                bytecode: shimBytecodeObject
                            }
                        }
                    },
                    callBytecode: {
                        bytecode: shimCallBytecodeObject
                    }
                });
            }
        })));
        // setting up a fake previous contract to test previous name record
        const { data: { projectsAdd: { projects } } } = (yield db.execute(AddProjects, {
            projects: [
                {
                    directory: compilationConfig["working_directory"]
                }
            ]
        }));
        expect(projects).toHaveLength(1);
        projectId = projects[0].id;
        expect(projectId).toEqual(expectedProjectId);
        let previousContract = {
            name: "Migrations",
            abi: { json: JSON.stringify(artifacts[1].abi) },
            createBytecode: bytecodeIds[0],
            callBytecode: callBytecodeIds[0],
            callBytecodeGeneratedSources: [],
            createBytecodeGeneratedSources: []
        };
        yield db.execute(AddContracts, {
            contracts: [previousContract]
        });
        previousContractExpectedId = system_1.generateId("contracts", {
            name: "Migrations",
            abi: { json: JSON.stringify(artifacts[1].abi) }
        });
        previousContractNameRecord = {
            resource: {
                id: previousContractExpectedId,
                type: "Contract"
            }
        };
        // add this fake name record, which differs in its abi, so that a previous contract
        // with this name exists for testing; also adding as a name head here
        const contractNameRecord = (yield db.execute(AddNameRecords, {
            nameRecords: [previousContractNameRecord]
        }));
        contractNameRecordId =
            contractNameRecord.data.nameRecordsAdd.nameRecords[0].id;
        yield db.execute(AssignProjectNames, {
            projectNames: [
                {
                    project: { id: projectId },
                    key: {
                        name: "Migrations",
                        type: "Contract"
                    },
                    nameRecord: {
                        id: contractNameRecordId
                    }
                }
            ]
        });
        const loader = new artifacts_1.ArtifactsLoader(db, compilationConfig);
        yield loader.load(compilationResult);
    }), 10000);
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(artifacts.map((contract, index) => __awaiter(void 0, void 0, void 0, function* () {
            const migratedArtifactPath = fse
                .readFileSync(path_1.default.join(__dirname, "compilationSources", "build", "contracts", migrationFileNames[index]))
                .toString();
            let migratedArtifact = JSON.parse(migratedArtifactPath);
            migratedArtifact.networks = {};
            migratedArtifact.updatedAt = "";
            migratedArtifact.schemaVersion = "3.0.9";
            fse.removeSync(path_1.default.join(__dirname, "compilationSources", "build", "contracts", migrationFileNames[index]));
            fse.outputFileSync(path_1.default.join(__dirname, "compilationSources", "build", "contracts", migrationFileNames[index]), JSON.stringify(migratedArtifact, null, 2));
        })));
    }));
    it("loads compilations", () => __awaiter(void 0, void 0, void 0, function* () {
        const compilationsQuery = yield Promise.all(compilationIds.map((compilationId) => __awaiter(void 0, void 0, void 0, function* () {
            let compilation = (yield db.execute(GetWorkspaceCompilation, compilationId));
            return compilation;
        })));
        const solcCompilation = compilationsQuery[0].data.compilation;
        expect(solcCompilation.compiler.version).toEqual(artifacts[0].compiler.version);
        expect(solcCompilation.sources.length).toEqual(3);
        solcCompilation.sources.map((source, index) => {
            // @ts-ignore
            expect(source.id).toEqual(sourceIds[index].id);
            // @ts-ignore
            expect(source.contents).toEqual(artifacts[index].source);
            // @ts-ignore
            expect(solcCompilation.processedSources[index].source.contents).toEqual(artifacts[index].source);
            // @ts-ignore
            expect(solcCompilation.processedSources[index].language).toEqual("Solidity");
            expect(
            // @ts-ignore
            solcCompilation.sourceMaps.find(sourceMap => sourceMap && sourceMap.data === artifacts[index].sourceMap)).toBeDefined();
        });
        expect(Array.isArray(solcCompilation.immutableReferences)).toBe(true);
        expect(solcCompilation.immutableReferences[0]).toHaveProperty("astNode");
        expect(solcCompilation.immutableReferences[0]).toHaveProperty("length");
        expect(solcCompilation.immutableReferences[0]).toHaveProperty("offsets");
        // @ts-ignore
        expect(solcCompilation.immutableReferences[0].astNode).toEqual(Object.entries(artifacts[0].immutableReferences)[0][0]);
        // @ts-ignore
        expect(solcCompilation.immutableReferences[0].length).toEqual(
        // @ts-ignore
        Object.entries(artifacts[0].immutableReferences)[0][1][0].length);
        // @ts-ignore
        expect(solcCompilation.immutableReferences[0].offsets[0]).toEqual(
        // @ts-ignore
        Object.entries(artifacts[0].immutableReferences)[0][1][0].start);
        let shimmedBytecode = compile_common_1.Shims.LegacyToNew.forBytecode(artifacts[0].deployedBytecode);
        // @ts-ignore
        expect(solcCompilation.immutableReferences[0].bytecode.bytes).toEqual(shimmedBytecode.bytes);
        const vyperCompilation = compilationsQuery[1].data.compilation;
        // @ts-ignore
        expect(vyperCompilation.compiler.version).toEqual(artifacts[3].compiler.version);
        // @ts-ignore
        expect(vyperCompilation.sources.length).toEqual(1);
        // @ts-ignore
        expect(vyperCompilation.sources[0].id).toEqual(sourceIds[3].id);
        // @ts-ignore
        expect(vyperCompilation.sources[0].contents).toEqual(artifacts[3].source);
        // @ts-ignore
        expect(vyperCompilation.processedSources[0].source.contents).toEqual(
        // @ts-ignore
        artifacts[3].source);
        // @ts-ignore
        expect(vyperCompilation.processedSources[0].language).toEqual("Vyper");
        // @ts-ignore
        expect(vyperCompilation.immutableReferences).toEqual([]);
    }));
    it("loads contract sources", () => __awaiter(void 0, void 0, void 0, function* () {
        for (let index in sourceIds) {
            let { data: { source: { contents, sourcePath } } } = (yield db.execute(GetWorkspaceSource, sourceIds[index]));
            expect(contents).toEqual(artifacts[index].source);
            expect(sourcePath).toEqual(artifacts[index].sourcePath);
        }
    }));
    it("loads bytecodes", () => __awaiter(void 0, void 0, void 0, function* () {
        for (let index in bytecodeIds) {
            let { data: { bytecode: { bytes } } } = (yield db.execute(GetWorkspaceBytecode, bytecodeIds[index]));
            let shimmedBytecode = compile_common_1.Shims.LegacyToNew.forBytecode(artifacts[index].bytecode);
            expect(bytes).toEqual(shimmedBytecode.bytes);
        }
    }));
    it("loads contracts", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        for (let index in artifacts) {
            let expectedId = contractIds[index];
            let { data: { contract: { id, name, processedSource: { source: { contents } }, compilation: { compiler: { version } }, createBytecode, callBytecode, callBytecodeGeneratedSources } } } = (yield db.execute(GetWorkspaceContract, contractIds[index]));
            const artifactsCreateBytecode = compile_common_1.Shims.LegacyToNew.forBytecode(artifacts[index].bytecode);
            expect(createBytecode.bytes).toEqual(artifactsCreateBytecode.bytes);
            //only test generatedSources for solc compiled contracts
            if (name !== "VyperStorage") {
                for (const { id, name, ast, contents, language } of artifacts[index]
                    .deployedGeneratedSources) {
                    const generatedSource = callBytecodeGeneratedSources[id];
                    expect(generatedSource).toBeDefined();
                    expect(generatedSource.source.sourcePath).toEqual(name);
                    expect((_a = generatedSource.ast) === null || _a === void 0 ? void 0 : _a.json).toEqual(JSON.stringify(ast));
                    expect(generatedSource.source.contents).toEqual(contents);
                    expect(generatedSource.language).toEqual(language);
                }
            }
            const artifactsCallBytecode = compile_common_1.Shims.LegacyToNew.forBytecode(artifacts[index].deployedBytecode);
            expect(callBytecode.bytes).toEqual(artifactsCallBytecode.bytes);
            expect(name).toEqual(artifacts[index].contractName);
            expect(contents).toEqual(artifacts[index].source);
            expect(version).toEqual(artifacts[index].compiler.version);
            expect(id).toEqual(contractIds[index].id);
            const { data: { project: { resolve } } } = (yield db.execute(ResolveProjectName, {
                projectId,
                name: artifacts[index].contractName,
                type: "Contract"
            }));
            const nameRecord = resolve[0];
            expect(nameRecord.resource.id).toEqual(contractIds[index].id);
        }
    }));
    it("loads networks", () => __awaiter(void 0, void 0, void 0, function* () {
        for (let index in migratedArtifacts) {
            let { data: { network: { name, networkId, historicBlock } } } = (yield db.execute(GetWorkspaceNetwork, netIds[index]));
            expect(name).toEqual("development");
            expect(networkId).toEqual(migratedNetworks[index]["networkId"]);
            expect(historicBlock).toEqual(migratedNetworks[index]["historicBlock"]);
        }
    }));
    it("loads contract instances", () => __awaiter(void 0, void 0, void 0, function* () {
        for (const contractInstanceId of contractInstanceIds) {
            let { data: { contractInstance: { address, network: { networkId }, contract: { name }, creation: { transactionHash, constructor: { createBytecode: { bytecode: { bytes, linkReferences } } } }, callBytecode: { bytecode } } } } = (yield db.execute(GetWorkspaceContractInstance, contractInstanceId));
            const contractInstance = contractInstances.find(contractInstance => name === contractInstance.contract.name);
            expect(contractInstance).toBeDefined();
            expect(name).toEqual(contractInstance.contract.name);
            expect(networkId).toEqual(contractInstance.network.networkId);
            expect(address).toEqual(contractInstance.address);
            expect(transactionHash).toEqual(contractInstance.creation.transactionHash);
            expect(bytes).toEqual(contractInstance.creation.constructor.createBytecode.bytecode.bytes);
            expect(linkReferences).toEqual(contractInstance.creation.constructor.createBytecode.bytecode
                .linkReferences);
            expect(bytecode.bytes).toEqual(contractInstance.callBytecode.bytecode.bytes);
        }
    }));
});
//# sourceMappingURL=integration.spec.js.map