import { UnaryFunction } from "rxjs";

export interface BackoffPolicy {
    maxTries: number;
    delay: number;
    backoff: () => UnaryFunction<any, any>;
}