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
exports.bytecodes = void 0;
const logger_1 = require("../logger");
const debug = logger_1.logger("db:resources:bytecodes");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const code_utils_1 = __importDefault(require("@truffle/code-utils"));
exports.bytecodes = {
    names: {
        resource: "bytecode",
        Resource: "Bytecode",
        resources: "bytecodes",
        Resources: "Bytecodes",
        resourcesMutate: "bytecodesAdd",
        ResourcesMutate: "BytecodesAdd"
    },
    createIndexes: [],
    idFields: ["bytes", "linkReferences"],
    typeDefs: graphql_tag_1.default `
    type Bytecode implements Resource {
      bytes: Bytes!
      linkReferences: [LinkReference!]
      instructions(count: Int): [Instruction!]
    }

    scalar Bytes

    type LinkReference {
      offsets: [ByteOffset!]!
      name: String
      length: Int!
    }

    scalar ByteOffset

    type Instruction {
      opcode: String!
      programCounter: Int!
      pushData: Bytes
    }

    input BytecodeInput {
      bytes: Bytes!
      linkReferences: [LinkReferenceInput!]
    }

    input LinkReferenceInput {
      offsets: [Int!]!
      name: String
      length: Int!
    }
  `,
    resolvers: {
        Bytecode: {
            instructions: {
                resolve({ bytes }, { count = null }) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const parsed = code_utils_1.default.parseCode(`0x${bytes}`, count);
                        return parsed.map(({ name: opcode, pc: programCounter, pushData }) => ({
                            opcode,
                            programCounter,
                            pushData
                        }));
                    });
                }
            }
        }
    }
};
//# sourceMappingURL=bytecodes.js.map