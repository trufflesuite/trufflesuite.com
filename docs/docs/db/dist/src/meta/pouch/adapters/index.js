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
Object.defineProperty(exports, "__esModule", { value: true });
exports.concretize = exports.Sqlite = exports.Memory = exports.Fs = exports.Couch = exports.Base = void 0;
const logger_1 = require("../../../logger");
const debug = logger_1.logger("db:meta:pouch:adapters");
const Base = __importStar(require("./base"));
exports.Base = Base;
const Couch = __importStar(require("./couch"));
exports.Couch = Couch;
const Fs = __importStar(require("./fs"));
exports.Fs = Fs;
const Memory = __importStar(require("./memory"));
exports.Memory = Memory;
const Sqlite = __importStar(require("./sqlite"));
exports.Sqlite = Sqlite;
const concretize = (options = {}) => {
    const { adapter: { name, settings } = { name: "sqlite" } } = options;
    debug("Selecting %s adapter", name);
    switch (name) {
        case "couch": {
            return {
                constructor: Couch.Databases,
                settings: settings || Couch.getDefaultSettings()
            };
        }
        case "fs": {
            return {
                constructor: Fs.Databases,
                settings: settings || Fs.getDefaultSettings()
            };
        }
        case "sqlite": {
            return {
                constructor: Sqlite.Databases,
                settings: settings || Sqlite.getDefaultSettings()
            };
        }
        case "memory": {
            return {
                constructor: Memory.Databases,
                settings: settings || Memory.getDefaultSettings()
            };
        }
        default: {
            throw new Error(`Unknown Truffle DB adapter: ${name}`);
        }
    }
};
exports.concretize = concretize;
//# sourceMappingURL=index.js.map