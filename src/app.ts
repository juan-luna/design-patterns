import { EMAIL_PARAMS } from "./data";
import { ApiCommand } from "./patterns/command/api-command";
import { RestInvoker } from "./patterns/command/invoker";
import { AxiosService } from "./patterns/command/receiver";
import { SimpleEmailServiceCommand } from "./patterns/command/ses-command";
import { RestRetryerInvoker } from "./patterns/commnad-strategy/retryer-invoker";
import { ConstantPolicy } from "./patterns/strategy/constant-policy";
require('dotenv').config();

/**
 * Client Code. Entry point.
 */
commandPatternExample();


/** Commnand Pattern */
function commandPatternExample() {

    // Call an API with final notification by email
    const createUserApiCommand = new ApiCommand(
        new AxiosService(),
        process.env.ENDPOINT,
        {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    );
    const invoker = new RestInvoker(createUserApiCommand); // Set main command
    invoker.setOnFinish(new SimpleEmailServiceCommand(EMAIL_PARAMS)); // Set optional command
    invoker.createEntity();

    // Same Invoker class could be re-used for creating many other entities.
}



/** Let's combine command and strategy pattern */
function commandAndStrategyExample() {

    // Call an API with final notification by email
    const createUserApiCommand = new ApiCommand(
        new AxiosService(),
        process.env.ERROR_ENDPOINT,
        {
            title: 'foo',
            body: 'bar',
            userId: 1
        }
    );
    const invoker = new RestRetryerInvoker(createUserApiCommand, new ConstantPolicy()); // Set main command
    invoker.setOnFinish(new SimpleEmailServiceCommand(EMAIL_PARAMS)); // Set optional command
    invoker.createEntity();

    // Same Invoker class could be re-used for creating many other entities.
}