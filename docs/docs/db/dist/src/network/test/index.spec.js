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
const debug = logger_1.logger("db:network:test");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const jest_fast_check_1 = require("jest-fast-check");
const fc = __importStar(require("fast-check"));
const Arbitrary = __importStar(require("../../../test/arbitraries/networks"));
const Network = __importStar(require("../index"));
const mockProvider_1 = require("./mockProvider");
const setup_1 = require("./setup");
const plan_1 = require("./plan");
const testConfig = process.env["OVERKILL"]
    ? {
        timeout: 5 * 60 * 1000,
        numRuns: 500
    }
    : {
        timeout: 30 * 1000,
        numRuns: 50
    };
describe("Network", () => {
    describe("for arbitrary batches of blocks from an arbitrary set of arbitrarily forked blockchains", () => {
        jest.setTimeout(testConfig.timeout);
        let run = 0;
        jest_fast_check_1.testProp(`saves network genealogies so that @truffle/db correctly reports known latest descendant networks (numRuns: ${testConfig.numRuns})`, [
            Arbitrary.Networks().chain(model => fc.record({
                model: fc.constant(model),
                batches: Arbitrary.Batches(model)
            })),
            fc.boolean()
        ], ({ model, batches }, disableIndex) => __awaiter(void 0, void 0, void 0, function* () {
            debug.extend("run")("run #%o", run++);
            const db = yield setup_1.setup({
                identifier: "test:network:property:latestDescendants"
            });
            // iterate over each batch
            for (const batch of batches) {
                debug("starting batch");
                const { descendantIndex } = batch;
                const name = model.networks[descendantIndex].name;
                debug("connecting with mocked provider");
                const provider = mockProvider_1.mockProvider({ model, batch });
                const network = yield Network.initialize({
                    db,
                    provider,
                    network: {
                        name
                    },
                    settings: {
                        skipKnownLatest: true
                    }
                });
                debug("loading networks");
                yield network.includeBlocks({
                    blocks: batch.inputs.map(({ historicBlock }) => historicBlock),
                    settings: {
                        disableIndex
                    }
                });
            }
            // compute expected
            const { expectedLatestDescendants } = plan_1.plan({ model, batches });
            debug("expectedLatestDescendants %O", expectedLatestDescendants);
            const { data: { networks } } = (yield db.execute(graphql_tag_1.default `
            query {
              networks {
                id
                historicBlock {
                  height
                }
                descendants(includeSelf: true, onlyLatest: true) {
                  id
                }
              }
            }
          `, {}));
            debug("networks %O", networks);
            const ids = new Set(networks
                .filter(({ descendants }) => descendants.length > 0)
                .map(({ descendants: [latestDescendant] }) => latestDescendant.id));
            debug("ids %O", ids);
            expect(ids).toEqual(new Set(expectedLatestDescendants.map(({ id }) => id)));
        }), {
            numRuns: testConfig.numRuns,
            interruptAfterTimeLimit: testConfig.timeout * 0.8 // leave padding
        });
    });
});
//# sourceMappingURL=index.spec.js.map