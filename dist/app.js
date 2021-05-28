"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const api_command_1 = require("./patterns/command/api-command");
const invoker_1 = require("./patterns/command/invoker");
const receiver_1 = require("./patterns/command/receiver");
const ses_command_1 = require("./patterns/command/ses-command");
const retryer_invoker_1 = require("./patterns/commnad-strategy/retryer-invoker");
const exponencial_policy_1 = require("./patterns/strategy/exponencial-policy");
require('dotenv').config();
/**
 * Client Code. Entry point.
 */
//commandPatternExample();
commandAndStrategyExample();
/** Commnand Pattern */
function commandPatternExample() {
    // Call an API with final notification by email
    const createUserApiCommand = new api_command_1.ApiCommand(new receiver_1.AxiosService(), process.env.ENDPOINT, {
        title: 'foo',
        body: 'bar',
        userId: 1
    });
    const invoker = new invoker_1.RestInvoker(createUserApiCommand); // Set main command
    invoker.setOnFinish(new ses_command_1.SimpleEmailServiceCommand(data_1.EMAIL_PARAMS)); // Set optional command
    invoker.createEntity();
    // Same Invoker class could be re-used for creating many other entities.
}
/** Let's combine command and strategy pattern */
function commandAndStrategyExample() {
    // Call an API with final notification by email
    const createUserApiCommand = new api_command_1.ApiCommand(new receiver_1.AxiosService(), process.env.ERROR_ENDPOINT, {
        title: 'foo',
        body: 'bar',
        userId: 1
    });
    const invoker = new retryer_invoker_1.RestRetryerInvoker(createUserApiCommand, new exponencial_policy_1.ExponencialPolicy()); // Set main command
    invoker.setOnFinish(new ses_command_1.SimpleEmailServiceCommand(data_1.EMAIL_PARAMS)); // Set optional command
    invoker.createEntity();
    // Same Invoker class could be re-used for creating many other entities.
}
//# sourceMappingURL=app.js.map