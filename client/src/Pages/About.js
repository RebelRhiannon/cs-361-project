function About() {
    return <><h1>About Page</h1><h3>This service allows you to encrypt and decrypt messages using your choice of encryption algorithm. The service also stores your encryption keys in a database. You can select your encryption algorithm using the dropdown menu under "Encryption Service."

      To encrypt a message, paste or write the message in the text box under "Encryption Service." The default algorithm is AES. To encrypt the message, press Enter.

      To decrypt a message, paste or write the encrypted message into the "Decryption Service" text box. Press Enter to receive your decrypted message.

      For convenience, both the encrypted and decrypted output fields include a "Copy" button. You can use this button to quickly copy the generated text without manually selecting it.

      At the bottom of the page, there is a red bar labeled "Delete All Stored Keys." Clicking this deletes all stored encryption keys, making it impossible to recover the key needed to decrypt messages. This is useful in the event of a security breach when compromised keys need to be removed.</h3></>;
  }
  
  export default About;
  