const openaiService = require("../services/openaiService");

// Controller function to handle generating image
const generateImage = async (req, res) => {
  try {
    const { prompt, size } = req.body;
    const imageUrl = await openaiService.generateImage(prompt, size);
    res.status(201).json({ message: "success", data: imageUrl });
  } catch (error) {
    // Handle errors
    if (error.response && error.response.data.error.code === 'billing_hard_limit_reached') {
      res.status(400).json({
        status: false,
        message: "Your billing limit has been reached. Please check your OpenAI account."
      });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ status: false, message: "The image could not be generated." });
    }
  }
};

module.exports = { generateImage };
