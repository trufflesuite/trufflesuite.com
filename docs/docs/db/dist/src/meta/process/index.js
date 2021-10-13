"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forDefinitions = void 0;
const logger_1 = require("../../logger");
const debug = logger_1.logger("db:meta:process");
const run_1 = require("./run");
const resources_1 = require("./resources");
const forDefinitions = (definitions) => ({
    forDb: run_1.runForDefinitions(definitions),
    resources: resources_1.resourceProcessorsForDefinitions(definitions)
});
exports.forDefinitions = forDefinitions;
//# sourceMappingURL=index.js.map