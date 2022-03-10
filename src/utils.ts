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

export function generateSecretWithSalt(salt: any, length: any) {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var secretLength = length;
  var secret = "";
  for (var i = 0; i <= secretLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    var randomNumberSalt = Math.floor(Math.random() * salt.length);
    console.log(randomNumber);
    secret +=
      Math.random() > 0.5
        ? chars.substring(randomNumber, randomNumber + 1)
        : salt.substring(randomNumberSalt, randomNumberSalt + 1);
  }
  return secret;
}
