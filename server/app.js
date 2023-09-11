const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();

const KEY = process.env.API_KEY;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'User-Agent']
}));

app.post('/generate_image', async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await generateImage(prompt);
      const imageURL = response.data.data[0].url;
      console.log("Image URL: ", imageURL)
      res.json({ image_url: imageURL });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating image' });
    }
});

  
async function generateImage(prompt) {
    const API_KEY = KEY;
    const url = 'https://api.openai.com/v1/images/generations';
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    };
  
    const data = {
      model: 'image-alpha-001',
      prompt,
      num_images: 1,
      size: '256x256',
      response_format: 'url',
    };
  
    return axios.post(url, data, { headers });
}
  

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
