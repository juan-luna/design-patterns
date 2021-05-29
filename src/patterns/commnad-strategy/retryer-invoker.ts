import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Command } from "../command/command";
import { BackoffPolicy } from "../strategy/backoff-policy";

/**
 * The Invoker is associated with one or several commands. It sends a request to the command.
 * In this particular case, the invoker is able to
 *  1) Execute a main comand
 *  2) Optionally, executes a final command.
 */
export class RestRetryerInvoker<U> {

    private _onSuccess: Command;

    constructor(private onStart: Command, private policy: BackoffPolicy) {
    }

    /**
     * Initialize commands. Final command.
     */
    public onSuccess(command: Command): void {
        this._onSuccess = command;
    }

    /**
     * The Invoker does not depend on concrete command o receiver classes.
     * It just executes command(s)
     */
    public createEntity(): void {
        of(0)
            .pipe(
                switchMap(() => this.onStart.execute()),
                this.policy.backoff())
            .subscribe({
                next: (v) => this._onSuccess.execute().subscribe(),
                error: (e) => console.error('Invocation failed after ' + this.policy.maxTries + ' retries')
        });
    }

}