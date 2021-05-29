import { concat, Observable, of, pipe, range, throwError, timer, UnaryFunction, zip } from "rxjs";
import { delay, dematerialize, map, materialize, mergeMap, retryWhen, switchMap, tap } from "rxjs/operators";
import { BackoffPolicy } from "./backoff-policy";

export class ExponentialBackoff implements BackoffPolicy {

    constructor(public maxTries: number = 5, public delay: number = 500) {}

    backoff(): UnaryFunction<any, any> {
        return pipe(
            retryWhen(attempts =>
              zip(range(1, this.maxTries + 1), attempts).pipe(
                mergeMap(([i, err]) => (i > this.maxTries) ? throwError(() => err) : of(i)),
                map(i => i * i),
                tap(v => console.log('Next try in: ' + v * this.delay + ' ms')),
                mergeMap(v => timer(v * this.delay))
              ),
            ),
          );
    }
    
}