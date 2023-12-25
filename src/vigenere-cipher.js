const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(reverse = true) {
    this.reverse = reverse;
  }

  encrypt(message, key) {
    this.validateInput(message, key);

    const encryptedMessage = this.cipher(message, key, "encrypt");
    return this.reverse
      ? encryptedMessage
      : encryptedMessage.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    this.validateInput(encryptedMessage, key);

    const decryptedMessage = this.cipher(encryptedMessage, key, "decrypt");
    return this.reverse
      ? decryptedMessage
      : decryptedMessage.split("").reverse().join("");
  }

  validateInput(message, key) {
    if (typeof message !== "string" || typeof key !== "string") {
      throw new Error("Incorrect arguments!");
    }
  }

  cipher(message, key, operation) {
    const result = [];
    const keyLength = key.length;
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i].toUpperCase();

      if (char >= "A" && char <= "Z") {
        const shift =
          key[keyIndex].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
        const charCode =
          operation === "encrypt"
            ? ((char.charCodeAt(0) + shift - "A".charCodeAt(0)) % 26) +
              "A".charCodeAt(0)
            : ((char.charCodeAt(0) - shift - "A".charCodeAt(0) + 26) % 26) +
              "A".charCodeAt(0);

        result.push(String.fromCharCode(charCode));
        keyIndex = (keyIndex + 1) % keyLength;
      } else {
        result.push(char);
      }
    }

    return result.join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
