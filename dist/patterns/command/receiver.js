"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosService = void 0;
const axios_1 = __importDefault(require("axios"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * This class acts a Receiver. It knows how to perform all kinds of operations,
 * associated with carrying out a request. In fact any class may serve as a Receiver.
 */
class AxiosService {
    callAPI(endpoint, payload) {
        return rxjs_1.from(axios_1.default.post(endpoint, Object.assign({}, payload))).pipe(operators_1.map(response => response.data), operators_1.tap(data => console.log(data)));
    }
}
exports.AxiosService = AxiosService;
//# sourceMappingURL=receiver.js.map