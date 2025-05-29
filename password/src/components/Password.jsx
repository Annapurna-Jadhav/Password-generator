import React, { useState, useCallback, useRef } from 'react';
import { useEffect } from 'react';

const Password = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charactersAllowed, setcharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charactersAllowed) {
      str += "!@#$%^&*()_+{}[]:;<>?,./";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length); // For mobile devices
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        Password Generator
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-96 transform transition duration-300 hover:scale-105">
        <div className="mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Length: <span className="text-blue-400">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => setlength(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setnumberAllowed((prev) => !prev)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Include Numbers</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={charactersAllowed}
              onChange={() => setcharactersAllowed((prev) => !prev)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Include Special Characters</span>
          </label>
        </div>
        <button
          onClick={passwordGenerator}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default Password;