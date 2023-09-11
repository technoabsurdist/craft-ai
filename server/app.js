const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();

const OPENAI_KEY = process.env.OPENAI_KEY;
const SD_KEY = process.env.SD_KEY;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'User-Agent']
}));

app.post('/generate_image', async (req, res) => {
  const { prompt } = req.body;
  const response = await generateImage(prompt);
  const imageURL = response.data.data[0].url;
  res.json({ image_url: imageURL });
});

app.post('/edit_image', async (req, res) => {
  const { prompt, init_image } = req.body;
  const response = await editImage(prompt, init_image);
  const newImageURL = response.data.output[0];
  res.json({ image_url: newImageURL });
});

async function generateImage(prompt) {
  const url = 'https://api.openai.com/v1/images/generations';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_KEY}`,
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

async function editImage(prompt, init_image) {
  const url = 'https://stablediffusionapi.com/api/v3/img2img';
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/2023.5.8',
  };
  const data = {
    key: SD_KEY,
    prompt,
    negative_prompt: null,
    init_image,
    width: '512',
    height: '512',
    samples: '1',
    num_inference_steps: '30',
    safety_checker: 'no',
    enhance_prompt: 'yes',
    guidance_scale: 7.5,
    strength: 0.7,
    seed: null,
    webhook: null,
    track_id: null
  };
  return axios.post(url, data, { headers });
}

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});

