# 🎵 MUME – Music Player App

MUME is a Spotify-inspired music player built using **React Native** and **Expo**.
The project focuses on clean state management, stable audio playback, and a simple
queue-based listening experience.

This project was built as part of an internship assignment.

---

## 🚀 Features

- 🔍 Song search
- ▶️ Play / Pause music
- ⏱ Mini player with progress indicator
- 📃 Queue system (add songs, remove songs)
- ⏭ Auto-play next song from queue
- 🌙 Dark-themed UI
- 📱 Runs on Expo Go (Android & iOS)

---

## 🧱 Architecture & Tech Stack

- **React Native + Expo** – cross-platform mobile development
- **Zustand** – global state management
- **Expo AV** – audio playback
- **Component-based architecture** – separation of concerns

### Folder Structure
src/
├── api/ # Search logic
├── data/ # Mock song dataset
├── screens/ # App screens
├── components/ # Reusable UI components
├── store/ # Zustand stores (player & queue)
