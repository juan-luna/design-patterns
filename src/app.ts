import { commandPatternExample } from "./patterns/command/client";
import { commandAndStrategyExample } from "./patterns/commnad-strategy/client";
import { printMenu } from "./utils/menu";
require('dotenv').config();
let prompt = require('prompt');

/**
 * Client Code. Entry point.
 */
 printMenu();
 prompt.get(['option'], function (err, result) {
    console.log('\n');
    switch (+result.option) {
        case 1: commandPatternExample(); break;
        case 2: commandAndStrategyExample(); break;
        default: console.log('Invalid option. Bye!'); break;
    }
});
