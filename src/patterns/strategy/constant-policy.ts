import { RetryPolicy } from "./retry-policy";

export class ConstantPolicy implements RetryPolicy {

    private retryCount: number;

    constructor(
        public maxTries: number = 5,
        private waitTime: number = 500) {
            this.retryCount = 0;
        }

    currentWait(): number {
        return this.waitTime;
    }

    shouldRetry(err: any): boolean {
        return err.response && err.response.status >= 400 ? false : this.retryCount < this.maxTries;
    }

    incrementTry(): void {
        this.retryCount++;
    }
    
}