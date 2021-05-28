"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestRetryerInvoker = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * The Invoker is associated with one or several commands. It sends a request to the command.
 * In this particular case, the invoker is able to
 *  1) Execute a main comand
 *  2) Optionally, executes a final command.
 */
class RestRetryerInvoker {
    constructor(onStart, retryPolicy) {
        this.onStart = onStart;
        this.retryPolicy = retryPolicy;
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
        this.retryPolicy.incrementTry();
        rxjs_1.of(1).pipe(operators_1.switchMap(() => this.onStart.execute()), operators_1.retryWhen(errors => errors.pipe(operators_1.tap(err => {
            // console.log(err);
            this.retryPolicy.incrementTry();
            console.log('Retrying...');
        }), operators_1.delay(this.retryPolicy.currentWait()), operators_1.take(this.retryPolicy.maxTries))), operators_1.switchMap(res => this.onFinish.execute())).subscribe({
            next: (v) => console.log(v),
            error: (e) => console.error('oops no success in main command')
        });
    }
}
exports.RestRetryerInvoker = RestRetryerInvoker;
//# sourceMappingURL=retryer-invoker.js.map