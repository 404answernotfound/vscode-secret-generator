// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { config } from "process";
import * as vscode from "vscode";
import { generateSecret, generateSecretWithSalt } from "./utils";
import path = require("path");
import fs = require("fs");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vs-secret-generator" is now active!'
  );

  // Randomize secret
  const configuration = vscode.workspace.getConfiguration("SecretGenerator");
  configuration
    .update(
      "startingSecret",
      generateSecret(),
      vscode.ConfigurationTarget.Global
    )
    .then(() => {});

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerTextEditorCommand(
    "vs-secret-generator.generateSecret",
    (editor, edit) => {
      const salt = configuration.get("startingSecret");
      const length = configuration.get("startingLength");
      const text = generateSecretWithSalt(salt, length);
      edit.replace(editor.selection, text);
      vscode.window.showInformationMessage("Secret generated correctly");
    }
  );

  let disposableEnv = vscode.commands.registerTextEditorCommand(
    "vs-secret-generator.generateEnv",
    (_editor, _edit) => {
      if (vscode.workspace.rootPath) {
        const salt = configuration.get("startingSecret");
        const length = configuration.get("startingLength");
        const text = generateSecretWithSalt(salt, length);
        const secret = `SECRET=${text}`;
        const filePath = path.join(vscode.workspace.rootPath, ".env");

        try {
          if (fs.existsSync(filePath)) {
            vscode.window.showInformationMessage(".env file already exists");
            return;
          }
          fs.writeFileSync(filePath, secret, "utf8");
          const openPath = vscode.Uri.file(filePath);
          vscode.workspace.openTextDocument(openPath).then((doc) => {
            vscode.window.showTextDocument(doc);
          });
          vscode.window.showInformationMessage(".env generated successfully");
        } catch (err) {
          console.error(err);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposableEnv);
}

// this method is called when your extension is deactivated
export function deactivate() {}
