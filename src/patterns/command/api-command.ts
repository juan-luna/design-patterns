import { Command } from "./command";
import { AxiosService } from "./receiver";

/**
 * This is an example of a complex concrete command. 
 * This command delegates more complex operation to other objects.
 * @author juan.luna
 */
export class ApiCommand<T, U> implements Command {

    constructor(
        private receiver: AxiosService<T, U>,
        private endpoint: string, 
        private payload: T) {}

    public execute() {
        console.log('Executing ApiCommand...')
        return this.receiver.callAPI(this.endpoint, this.payload);
    }
    
}