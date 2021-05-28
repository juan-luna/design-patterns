export interface RetryPolicy {
    maxTries: number;
    currentWait: () => number;
    shouldRetry: (err) =>  boolean;
    incrementTry: () => void;

}