import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { generateSecret, generateSecretWithSalt } from "../../utils";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Generates a different secret on each run", () => {
    assert.strictEqual(false, generateSecret() === generateSecret());
    assert.strictEqual(
      false,
      generateSecretWithSalt("random", 8) ===
        generateSecretWithSalt("random", 8)
    );
  });
});
