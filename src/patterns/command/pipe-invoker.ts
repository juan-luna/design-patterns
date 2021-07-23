import { from, of, zip } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { Command } from "./command";

/**
 * The Invoker is associated with one or several commands. It sends a request to the command.
 * In this particular case, the invoker is able to
 *  1) Execute a main comand
 *  2) Optionally, executes a final command.
 */
export class PipeInvoker<U> {

	private commands: Command[] = [];
	private doneCommands: Command[] = [];

    constructor() {
    }

	public pipe(...commands: Command[]): PipeInvoker<U> {
		this.commands.push(...commands);
		return this;
	}


    /**
     * The Invoker does not depend on concrete command o receiver classes.
     * It just executes command(s)
     */
    public run(): void {
		from(this.commands)
			.pipe(
				switchMap(c => zip(of(c), c.execute())),
				tap(([_command, _result]) => this.doneCommands.push(_command))
			)
			.subscribe({
				next: (success) => console.log(success),
                error: (e) => console.error(e)
			});

    }

	public compensate(): void {

	}

}