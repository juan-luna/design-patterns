import { switchMap } from "rxjs/operators";
import { Command } from "./command";

/**
 * The Invoker is associated with one or several commands. It sends a request to the command.
 * In this particular case, the invoker is able to
 *  1) Execute a main comand
 *  2) Optionally, executes a final command.
 */
export class RestInvoker<U> {

    private _onSuccess: Command;

    constructor(private onStart: Command) {
    }

    /**
     * Initialize commands. onFinish Command.
     */
    public onSuccess(command: Command): void {
        this._onSuccess = command;
    }

    /**
     * The Invoker does not depend on concrete command o receiver classes.
     * It just executes command(s)
     */
    public createEntity(): void {
        this.onStart.execute()
            .pipe(
                switchMap(res => this._onSuccess.execute())
            )
            .subscribe({
                next: (v) => console.log(v),
                error: (e) => console.error(e)
            });
    }

}
