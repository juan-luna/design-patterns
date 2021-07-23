import { EMAIL_PARAMS } from "../../data";
import { ApiCommand } from "./api-command";
import { SimpleInvoker } from "./invoker";
import { PipeInvoker } from "./pipe-invoker";
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
	const sesCommand = new SimpleEmailServiceCommand(EMAIL_PARAMS);
    const invoker = new SimpleInvoker(apiCommand); // Set main command
    invoker.onSuccess(sesCommand); // Set optional command
    invoker.createEntity();

    // Same Invoker class could be re-used for creating many other entities.


	new PipeInvoker()
		.pipe(
			apiCommand,
			sesCommand
		).run();
};