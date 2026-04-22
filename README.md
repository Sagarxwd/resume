# NovaResume - PERN Project

A modern, professional resume builder built with React, Express, and MongoDB.

## Features
- **Dynamic Previews**: Real-time resume updates as you type.
- **AI-Powered**: Resume extraction and refinement using Gemini/OpenAI.
- **Image Processing**: Profile image handling with ImageKit.
- **Templates**: Multiple professional templates (Modern, Classic, Minimal).

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Redux Toolkit.
- **Backend**: Node.js, Express, Mongoose.
- **Storage**: ImageKit.
- **AI**: OpenAI API (compatible with Google Gemini).

## Deployment Guide

### Frontend (Vercel)
1. Point to the `client` directory.
2. Set Environment Variable: `VITE_BACKEND_URL` to your backend URL.

### Backend (Render/Railway)
1. Point to the `server` directory.
2. Set Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `IMAGEKIT_PRIVATE_KEY`
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL`
   - `OPENAI_MODEL`

## Setup
1. Clone the repository.
2. Install dependencies:
   - `cd client && npm install`
   - `cd server && npm install`
3. Run locally:
   - Client: `npm run dev`
   - Server: `npm run server`
