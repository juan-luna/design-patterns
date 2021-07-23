import axios from "axios";
import { from, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

/**
 * This class acts a Receiver. It knows how to perform all kinds of operations,
 * associated with carrying out a request. In fact any class may serve as a Receiver.
 */
export class AxiosService<T, U> {

    public callAPI(endpoint: string, payload: T): Observable<U> {
        console.log('callingAPI: ', endpoint, JSON.stringify(payload));
        return from(
            axios.post(
                endpoint, 
                { ... payload }
            )
        ).pipe(
            map(response => response.data),
            tap(data => console.log(data)));
    }

}