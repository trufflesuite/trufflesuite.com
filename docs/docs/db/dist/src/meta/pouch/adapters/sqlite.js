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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Databases = exports.getDefaultSettings = void 0;
const logger_1 = require("../../../logger");
const debug = logger_1.logger("db:meta:pouch:adapters:sqlite");
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const pouchdb_1 = __importDefault(require("pouchdb"));
const pouchdb_adapter_node_websql_1 = __importDefault(require("pouchdb-adapter-node-websql"));
const Base = __importStar(require("./base"));
const config_1 = __importDefault(require("@truffle/config"));
const getDefaultSettings = () => ({
    directory: path_1.default.join(config_1.default.getTruffleDataDirectory(), ".db", "sqlite")
});
exports.getDefaultSettings = getDefaultSettings;
class Databases extends Base.Databases {
    setup(settings) {
        this.directory = settings.directory;
        fs_extra_1.default.ensureDirSync(this.directory);
        pouchdb_1.default.plugin(pouchdb_adapter_node_websql_1.default);
    }
    createDatabase(resource) {
        const savePath = path_1.default.resolve(this.directory, resource);
        return new pouchdb_1.default(savePath, { adapter: "websql" });
    }
}
exports.Databases = Databases;
//# sourceMappingURL=sqlite.js.map