import { of, pipe, range, throwError, timer, UnaryFunction, zip } from "rxjs";
import { map, mergeMap, retryWhen, tap } from "rxjs/operators";
import { BackoffPolicy } from "./backoff-policy";

export class JitterExponentialBackoff implements BackoffPolicy {

    constructor(public maxTries: number = 5, public delay: number = 500) {}

    backoff(): UnaryFunction<any, any> {
        return pipe(
            retryWhen(attempts =>
              zip(range(1, this.maxTries + 1), attempts).pipe(
                mergeMap(([i, err]) => (i > this.maxTries) ? throwError(() => err) : of(i)),
                map(i => i * i * this.delay),
                map(v => v + (Math.random() * v)),
                tap(wait => console.log('Next try in: ' + wait + ' ms')),
                mergeMap(wait => timer(wait))
              ),
            ),
        );
    }
}
