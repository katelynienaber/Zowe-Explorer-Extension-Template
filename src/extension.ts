import { IZoweLogger, ZoweVsCodeExtension } from '@zowe/zowe-explorer-api';
import path = require('path');
import * as vscode from 'vscode';
import { getProfileInfo, setConfiguration } from './utilities';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand("ze-ext.setConfiguration", () => setConfiguration()));

    context.subscriptions.push(vscode.commands.registerCommand("ze-ext.getProfileInfo", (node) => {
        if (node) {
            getProfileInfo(node);
        } else {
            console.log("node is empty");
        }
    }));

    const logLocation = path.join(__dirname, "/logs/ZE");
    const loggerMessage = "Test error!";

    // Initialize the Zowe Explorer logger
    const logger = new IZoweLogger("Zowe Explorer Extension Template", logLocation);

    // Log an error to the log file only
    logger.logImperativeMessage(loggerMessage, 4);

    // Show an error to the user in VSCode, and log it to the log file
    ZoweVsCodeExtension.showVsCodeMessage(loggerMessage, 4, logger);
}