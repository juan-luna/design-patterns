import { Observable } from "rxjs";

export interface Command {
    execute(): Observable<any>;
}
