

# Language Learning App 

A language learning app built with **React Native (Expo)** and a **Node.js + Express backend**.  
It uses spaced repetition (SRS), topic-based learning, and AI-generated sentences for context and audio playback for them.

---

## Features

- Firebase Authentication (login/register)
- Topic based word learning system
- Spaced Repetition System (SRS)
- Track progress per topic
- Daily review of known words
- AI generated sentences using learned vocabulary
- Text to speech audio playback
- React Native app for web and mobile

---

## How It Works

1. User logs in
2. Selects a topic
3. Learns 5 new words per session
4. Encountered words are marked as known and can be reviewed.
5. Words are scheduled for review (SRS) on certain dates.
6. Known words are used to generate AI sentences
7. Sentences can be played as audio

---

## Tech Stack

**Frontend**

- React Native (Expo)
- Firebase Auth

**Backend**

- Node.js + Express
- Deployed on AWS EC2
- MongoDB Atlas
- OpenAI API
- Gemini 2.5 Text-to-Speech API

---

## Authentication

- Firebase handles login/signup
