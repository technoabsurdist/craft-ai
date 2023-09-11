# 🖌️ Craft AI

## Overview

This is an interactive tool that allows users to create and modify images through text-based prompts. Built with React and Express, the tool interfaces with OpenAI's image generation API. Start with a basic prompt like "Create an anime profile picture," then iteratively refine it with prompts such as "change background to blue."

## Features

- **Initial Image Generation**: Generate an image from a text prompt.
- **Iterative Editing**: Modify existing image using subsequent prompts.
- **Image Grid**: View all your generated images in a grid layout.
- **User Feedback**: Toast notifications and loading animations provide responsive user feedback.

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/YourUsername/InteractiveImageGen.git
```

### Install Dependencies

1. **Frontend:**

```bash
cd frontend
npm install
```

2. **Backend:**

```bash
cd backend
npm install
```

## Running the Application

1. **Backend Server:**

```bash
cd backend
npm start
```

Server will run on `http://localhost:5001`.

2. **React App:**

```bash
cd frontend
npm start
```

Accessible at `http://localhost:3000`.

## Usage

1. Input your initial text prompt.
2. Press 'Enter' to generate the image.
3. Modify the image using more text prompts and hit 'Enter'.
4. Review all your versions in the grid below the input box.

## Tech Stack

- Frontend: React
- Backend: Express
- Libraries: Axios, CORS
- API: OpenAI's Image Generation API

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you'd like to change.

