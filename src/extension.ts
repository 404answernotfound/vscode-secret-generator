// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vs-secret-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerTextEditorCommand(
    "vs-secret-generator.generateSecret",
    (editor, edit) => {
      let text = generateSecret();
      edit.replace(editor.selection, text);
      vscode.window.showInformationMessage("Secret generated correctly");
    }
  );

  vscode.commands.registerTextEditorCommand(
    "intrexx-js-lib.start",
    (editor, edit) => {
      let text = "FooBar";
      edit.replace(editor.selection, text);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export function generateSecret() {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var secretLength = 16;
  var secret = "";
  for (var i = 0; i <= secretLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    secret += chars.substring(randomNumber, randomNumber + 1);
  }
  return secret;
}
