import { EMAIL_PARAMS } from "../../data";
import { ApiCommand } from "./api-command";
import { RestInvoker } from "./invoker";
import { AxiosService } from "./receiver";
import { SimpleEmailServiceCommand } from "./ses-command";

/** Commnand Pattern */
export function commandPatternExample() {

    // Call an API with final notification by email
    const apiCommand = new ApiCommand(
        new AxiosService(),
        process.env.ENDPOINT,
        {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    );
    const invoker = new RestInvoker(apiCommand); // Set main command
    invoker.onSuccess(new SimpleEmailServiceCommand(EMAIL_PARAMS)); // Set optional command
    invoker.createEntity();

    // Same Invoker class could be re-used for creating many other entities.
};