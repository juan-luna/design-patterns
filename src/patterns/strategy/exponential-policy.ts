export class ExponentialPolicy {

    private retryCount: number;

    constructor(
        public maxTries: number = 5,
        private initWaitTime: number = 500) {
            this.retryCount = 0;
        }

    currentWait(): number {
        return Math.pow(this.initWaitTime, this.retryCount);
    }

    shouldRetry(err: any): boolean {
        return err.response && err.response.status >= 400 ? false : this.retryCount < this.maxTries;
    }

    incrementTry(): void {
        this.retryCount++;
    }

}