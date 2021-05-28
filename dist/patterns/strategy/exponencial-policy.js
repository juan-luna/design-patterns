"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExponencialPolicy = void 0;
class ExponencialPolicy {
    constructor(maxTries = 5, initWaitTime = 500) {
        this.maxTries = maxTries;
        this.initWaitTime = initWaitTime;
        this.retryCount = 0;
    }
    currentWait() {
        return Math.pow(this.initWaitTime, this.retryCount);
    }
    shouldRetry(err) {
        return err.response && err.response.status >= 400 ? false : this.retryCount < this.maxTries;
    }
    incrementTry() {
        this.retryCount++;
    }
}
exports.ExponencialPolicy = ExponencialPolicy;
//# sourceMappingURL=exponencial-policy.js.map