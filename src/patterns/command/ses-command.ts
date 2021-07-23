import { Observable, of } from "rxjs";
import { Email } from "../../model/email";
import { Command } from "./command";

/**
 * Some commands can implement simple operations on their own. 
 * @author juan.luna
 */
export class SimpleEmailServiceCommand<U> implements Command {

    constructor(
        private email: Email
    ) {}

    execute(): Observable<String> {
        console.log('Executing SES Command...');
        return of('Email sent: ' + JSON.stringify(this.email));
    }

}