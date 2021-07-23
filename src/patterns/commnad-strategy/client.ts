import { EMAIL_PARAMS } from "../../data";
import { ApiCommand } from "../command/api-command";
import { AxiosService } from "../command/receiver";
import { SimpleEmailServiceCommand } from "../command/ses-command";
import { ConstantPolicy } from "../strategy/constant-policy";
import { ExponentialBackoff } from "../strategy/exp-backoff";
import { JitterExponentialBackoff } from "../strategy/jitter-policy";
import { RetryerInvoker } from "./retryer-invoker";

/** Let's combine command and strategy pattern */
export function commandAndStrategyExample() {

    console.log('Running Command and Strategy Pattern: ');

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
    // const invoker = new RestRetryerInvoker(apiCommand, new ExponentialBackoff());
    const invoker = new RetryerInvoker(apiCommand, new JitterExponentialBackoff());
    invoker.onSuccess(sesCommand);
    invoker.createEntity();
}