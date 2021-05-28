"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEmailServiceCommand = void 0;
const rxjs_1 = require("rxjs");
/**
 * Some commands can implement simple operations on their own.
 * @author juan.luna
 */
class SimpleEmailServiceCommand {
    constructor(email) {
        this.email = email;
    }
    execute() {
        console.log('Executing SES Command...');
        return rxjs_1.of('Email sent: ' + JSON.stringify(this.email));
    }
}
exports.SimpleEmailServiceCommand = SimpleEmailServiceCommand;
//# sourceMappingURL=ses-command.js.map