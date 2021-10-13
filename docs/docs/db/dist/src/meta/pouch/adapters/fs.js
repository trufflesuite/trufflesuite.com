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
const debug = logger_1.logger("db:meta:pouch:adapters:fs");
const path_1 = __importDefault(require("path"));
const pouchdb_1 = __importDefault(require("pouchdb"));
const jsondown = __importStar(require("jsondown"));
const PouchDBUtils = __importStar(require("pouchdb-utils"));
const pouchdb_adapter_leveldb_core_1 = __importDefault(require("pouchdb-adapter-leveldb-core"));
const Base = __importStar(require("./base"));
const config_1 = __importDefault(require("@truffle/config"));
const getDefaultSettings = () => ({
    directory: path_1.default.join(config_1.default.getTruffleDataDirectory(), ".db", "json")
});
exports.getDefaultSettings = getDefaultSettings;
class Databases extends Base.Databases {
    setup(settings) {
        this.directory = settings.directory;
        this.jsondownpouch["valid"] = () => true;
        this.jsondownpouch["use_prefix"] = false;
        pouchdb_1.default.adapter("jsondown", this.jsondownpouch, true);
    }
    createDatabase(resource) {
        const savePath = path_1.default.join(this.directory, resource);
        return new pouchdb_1.default(savePath, { adapter: "jsondown" });
    }
    jsondownpouch(opts, callback) {
        const _opts = PouchDBUtils.assign({
            db: jsondown.default
        }, opts);
        pouchdb_adapter_leveldb_core_1.default.call(this, _opts, callback);
    }
}
exports.Databases = Databases;
//# sourceMappingURL=fs.js.map