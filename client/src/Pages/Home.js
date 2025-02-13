import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function Home() {
  const [inputMessage, setInputMessage] = useState('');
  const [result, setResult] = useState('');
  const [cipher, setCipher] = useState('caesar'); // Default cipher

  const shift = 3; // Simple Caesar Cipher shift
  const aesSecretKey = 'my-secret-key'; // Secret key for AES

  // Define the Substitution Cipher alphabet (example mapping)
  const substitutionAlphabet = {
    'a': 'x', 'b': 'y', 'c': 'z', 'd': 'a', 'e': 'b', 'f': 'c', 'g': 'd',
    'h': 'e', 'i': 'f', 'j': 'g', 'k': 'h', 'l': 'i', 'm': 'j', 'n': 'k',
    'o': 'l', 'p': 'm', 'q': 'n', 'r': 'o', 's': 'p', 't': 'q', 'u': 'r',
    'v': 's', 'w': 't', 'x': 'u', 'y': 'v', 'z': 'w', 'A': 'X', 'B': 'Y',
    'C': 'Z', 'D': 'A', 'E': 'B', 'F': 'C', 'G': 'D', 'H': 'E', 'I': 'F',
    'J': 'G', 'K': 'H', 'L': 'I', 'M': 'J', 'N': 'K', 'O': 'L', 'P': 'M',
    'Q': 'N', 'R': 'O', 'S': 'P', 'T': 'Q', 'U': 'R', 'V': 'S', 'W': 'T',
    'X': 'U', 'Y': 'V', 'Z': 'W'
  };

  // Encryption function for Caesar cipher
  function caesarEncrypt(text) {
    return text.split('').map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        const base = char === char.toLowerCase() ? 97 : 65;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
  }

  // Decryption function for Caesar cipher
  function caesarDecrypt(text) {
    return text.split('').map((char) => {
      if (/[a-zA-Z]/.test(char)) {
        const code = char.charCodeAt(0);
        const base = char === char.toLowerCase() ? 97 : 65;
        return String.fromCharCode(((code - base - shift + 26) % 26) + base);
      }
      return char;
    }).join('');
  }

  // AES encryption function
  function aesEncrypt(text) {
    return CryptoJS.AES.encrypt(text, aesSecretKey).toString();
  }

  // AES decryption function
  function aesDecrypt(text) {
    const bytes = CryptoJS.AES.decrypt(text, aesSecretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Substitution Cipher encryption function
  function substitutionEncrypt(text) {
    return text.split('').map((char) => {
      return substitutionAlphabet[char] || char; // Return substituted char or the original if not in the alphabet
    }).join('');
  }

  // Substitution Cipher decryption function
  function substitutionDecrypt(text) {
    const reverseSubstitutionAlphabet = Object.fromEntries(
      Object.entries(substitutionAlphabet).map(([key, value]) => [value, key])
    );
    return text.split('').map((char) => {
      return reverseSubstitutionAlphabet[char] || char; // Return substituted char or the original if not in the alphabet
    }).join('');
  }

  // Handle the input change
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  // Handle cipher selection change
  const handleCipherChange = (event) => {
    setCipher(event.target.value);
  };

  // Encryption and Decryption based on selected cipher
  const handleEncrypt = () => {
    let encryptedMessage;
    if (cipher === 'caesar') {
      encryptedMessage = caesarEncrypt(inputMessage);
    } else if (cipher === 'aes') {
      encryptedMessage = aesEncrypt(inputMessage);
    } else if (cipher === 'substitution') {
      encryptedMessage = substitutionEncrypt(inputMessage);
    }
    setResult(`<strong>Encrypted Message:</strong> ${encryptedMessage}`);
  };

  const handleDecrypt = () => {
    let decryptedMessage;
    if (cipher === 'caesar') {
      decryptedMessage = caesarDecrypt(inputMessage);
    } else if (cipher === 'aes') {
      decryptedMessage = aesDecrypt(inputMessage);
    } else if (cipher === 'substitution') {
      decryptedMessage = substitutionDecrypt(inputMessage);
    }
    setResult(`<strong>Decrypted Message:</strong> ${decryptedMessage}`);
  };

  return (
    <div className="container">
      <h1>Message Encryption and Decryption Service</h1>
      <h3>This service allows you to encrypt and decrypt messages. This can benefit users by changing messages into a format that is not easy for humans to read. This helps protect your information. </h3>
      <h3>NOTE: Save Cipher and Output Before Exiting to Be Able to Decrypt Message </h3>

      {/* Cipher selection menu */}
      <label htmlFor="cipher-select">Choose a Cipher:</label>
      <select id="cipher-select" value={cipher} onChange={handleCipherChange}>
        <option value="caesar">Caesar Cipher</option>
        <option value="aes">AES Encryption</option>
        <option value="substitution">Substitution Cipher</option>
        <option value="vigenere">Vigenère Cipher</option>
      </select>

      <input
        type="text"
        value={inputMessage}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Enter your message here"
      />

      <button onClick={handleEncrypt} className="button">Encrypt</button>
      <button onClick={handleDecrypt} className="button">Decrypt</button>

      <div className="result" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
}

export default Home;
