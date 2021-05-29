import { EMAIL_PARAMS } from "../../data";
import { ApiCommand } from "../command/api-command";
import { AxiosService } from "../command/receiver";
import { SimpleEmailServiceCommand } from "../command/ses-command";
import { ExponentialBackoff } from "../strategy/exp-backoff";
import { RestRetryerInvoker } from "./retryer-invoker";

/** Let's combine command and strategy pattern */
export function commandAndStrategyExample() {

    // Call an API with final notification by email
    const apiCommand = new ApiCommand(
        new AxiosService(),
        process.env.ERROR_ENDPOINT,
        {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    );

    const sesCommand = new SimpleEmailServiceCommand(EMAIL_PARAMS);
    // const invoker = new RestRetryerInvoker(apiCommand, new ConstantPolicy());
    const invoker = new RestRetryerInvoker(apiCommand, new ExponentialBackoff());
    invoker.onSuccess(sesCommand);
    invoker.createEntity();
}