const { Configuration, OpenAI } = require("openai");

// Initialize OpenAI configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const configuration =  Configuration({
//   apiKey: OPENAI_API_KEY,
// });
const openai = new OpenAI(OPENAI_API_KEY);

// Service function to generate image
const generateImage = async (prompt, size) => {
  const imageSize = size === "small" ? "256x256" :
                    size === "medium" ? "512x512" :
                    "1024x1024";

  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt,
    n: 1,
    size: imageSize,
  });
console.log(response)
   return response.data[0].url;
};

module.exports = { generateImage };
