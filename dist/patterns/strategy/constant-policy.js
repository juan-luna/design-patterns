"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantPolicy = void 0;
class ConstantPolicy {
    constructor(maxTries = 5, waitTime = 500) {
        this.maxTries = maxTries;
        this.waitTime = waitTime;
        this.retryCount = 0;
    }
    currentWait() {
        return this.waitTime;
    }
    shouldRetry(err) {
        return err.response && err.response.status >= 400 ? false : this.retryCount < this.maxTries;
    }
    incrementTry() {
        this.retryCount++;
    }
}
exports.ConstantPolicy = ConstantPolicy;
//# sourceMappingURL=constant-policy.js.map