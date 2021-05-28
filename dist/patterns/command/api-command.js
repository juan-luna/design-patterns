"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCommand = void 0;
/**
 * This is an example of a complex concrete command.
 * This command delegates more complex operation to other objects.
 * @author juan.luna
 */
class ApiCommand {
    constructor(receiver, endpoint, payload) {
        this.receiver = receiver;
        this.endpoint = endpoint;
        this.payload = payload;
    }
    execute() {
        console.log('Executing ApiCommand...');
        return this.receiver.callAPI(this.endpoint, this.payload);
    }
}
exports.ApiCommand = ApiCommand;
//# sourceMappingURL=api-command.js.map