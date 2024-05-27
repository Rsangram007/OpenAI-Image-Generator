import React, { useState } from "react";
import { getRandomPrompt } from "../utils";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("large");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(prompt);
    setPrompt(randomPrompt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setErrorMessage("");

    if (prompt === "") {
      alert("Please add some text");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/generateImage", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });

      if (!response.ok) {
        throw new Error("That image could not be generated");
      }

      const data = await response.json();

      setImageUrl(data.data);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-[60vh] font-sans">
      {imageUrl && (
        <div className="w-1/3.5 max-w-xl p-5 rounded-lg shadow-lg bg-white mt-5">
          <h2 className="text-center text-lg font-semibold">Generated Image</h2>
          <div className="text-center mt-4">
            <img src={imageUrl} alt="Generated" className="max-w-full rounded-lg mx-auto" />
          </div>
        </div>
      )}

      {message && (
        <div className="mt-5 p-4 rounded-lg text-center bg-green-100 text-green-800">
          {message}
        </div>
      )}
      {errorMessage && (
        <div className="mt-5 p-4 rounded-lg text-center bg-red-100 text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="w-full p-5 fixed bottom-5 left-0 right-0 bg-white rounded-t-lg shadow-lg">
        <form id="image-form" onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            id="prompt"
            placeholder="Message ChatGPT"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow p-3 text-base border border-gray-300 rounded-full mr-3"
          />
          <button
            type="button"
            className="p-3 text-base font-medium text-white bg-green-500 rounded-full mr-3"
            onClick={handleSurpriseMe}
          >
            Surprise Me
          </button>
          <select
            name="size"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-3 text-base border border-gray-300 rounded-full mr-3"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <button
            type="submit"
            className="p-3 text-base font-medium text-white bg-blue-500 rounded-full"
          >
            Generate
            {loading ? (
              <i className="fas fa-spinner fa-spin ml-2"></i>
            ) : (
              <i className="fas fa-paper-plane ml-2"></i>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
