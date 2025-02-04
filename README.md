# Chat App

This is a chat application built using React and Vite. It allows users to send and receive messages in real-time.

## Dependencies

- React
- Vite
- Firebase
- Emoji-picker-react
- @fortawesome icons

## Installation

1. Clone the repository: `git clone https://github.com/AndyDrewDev/chat-app.git`
2. Install the dependencies: `npm install`
3. Create a Firebase project and configure the Firebase settings in the [src/firebase.js](cci:7://file:///Users/rokur/Desktop/Projects/chat-app/chat-app/src/firebase.js:0:0-0:0) file.
4. Start the development server: `npm run dev`

## Project Structure

```
chat-app/
├─ src/
│  ├─ audio/
│  ├─ auth/
│  ├─ hooks/
│  ├─ components/
│  │  ├─ Chat.jsx
│  │  ├─ Message.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ SignIn.jsx
│  │  ├─ SignOutButton.jsx
│  │  ├─ SendMessage.jsx
│  │  └─ User.jsx
│  ├─ utils/
│  │  ├─ date.js
│  │  └─ sendMessageToDb.js
│  ├─ firebase.js
│  ├─ App.jsx
│  └─ index.jsx
├─ public/
│  └─ index.html
├─ README.md
├─ vite.config.js
└─ package.json
```

## Usage

1. Open the chat app in your browser.
2. Sign in with your Google account using the sign-in button in the top right corner.
3. Open second browser window with another Google account or use incognito mode.
4. Start chatting.
