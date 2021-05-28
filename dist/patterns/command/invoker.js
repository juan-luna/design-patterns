"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestInvoker = void 0;
const operators_1 = require("rxjs/operators");
/**
 * The Invoker is associated with one or several commands. It sends a request to the command.
 * In this particular case, the invoker is able to
 *  1) Execute a main comand
 *  2) Optionally, executes a final command.
 */
class RestInvoker {
    constructor(onStart) {
        this.onStart = onStart;
    }
    /**
     * Initialize commands. Optional final command.
     */
    setOnFinish(command) {
        this.onFinish = command;
    }
    /**
     * The Invoker does not depend on concrete command o receiver classes.
     * It just executes command(s)
     */
    createEntity() {
        this.onStart.execute()
            .pipe(operators_1.switchMap(res => this.onFinish.execute()))
            .subscribe({
            next: (v) => console.log(v),
            error: (e) => console.error(e)
        });
    }
}
exports.RestInvoker = RestInvoker;
//# sourceMappingURL=invoker.js.map