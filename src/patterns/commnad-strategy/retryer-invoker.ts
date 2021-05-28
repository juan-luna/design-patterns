import { of, throwError, timer } from "rxjs";
import { concatMap, delay, delayWhen, retryWhen, switchMap, take, tap } from "rxjs/operators";
import { Command } from "../command/command";
import { RetryPolicy } from "../strategy/retry-policy";

/**
 * The Invoker is associated with one or several commands. It sends a request to the command.
 * In this particular case, the invoker is able to
 *  1) Execute a main comand
 *  2) Optionally, executes a final command.
 */
export class RestRetryerInvoker<U> {

    private onFinish: Command;

    constructor(private onStart: Command, private retryPolicy: RetryPolicy) {
    }

    /**
     * Initialize commands. Optional final command.
     */
    public setOnFinish(command: Command): void {
        this.onFinish = command;
    }

    /**
     * The Invoker does not depend on concrete command o receiver classes.
     * It just executes command(s)
     */
    public createEntity(): void {

        this.retryPolicy.incrementTry();
        of(1).pipe(
            switchMap(() => this.onStart.execute()),
            retryWhen(errors => 
                errors.pipe(
                    tap(err => {
                        // console.log(err);
                        this.retryPolicy.incrementTry();
                        console.log('Retrying...');
                    }),
                    delay(this.retryPolicy.currentWait()),
                    take(this.retryPolicy.maxTries)
                )),
            switchMap(res => this.onFinish.execute())
        ).subscribe({
                next: (v) => console.log(v),
                error: (e) => console.error('oops no success in main command')
        });
    }

}