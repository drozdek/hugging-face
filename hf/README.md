# Hugging Face Transformers.js Playground

A small React app that demonstrates running machine-learning pipelines in the browser with [Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js). Try text sentiment analysis or speak a sample sentence and see what the speech recognizer hears.

## Features

- **Text sentiment analysis** — enter text and view the predicted sentiment label with its confidence score.
- **Speech transcription** — press and hold the recording button, speak the displayed sample sentence, and release to transcribe it with the English Whisper model.
- **In-browser inference** — the active examples use Transformers.js pipelines directly from the React app; no application-specific API server is configured.
- **React and Vite development workflow** — hot module replacement during development, plus build, lint, and preview scripts.

## Tech stack

- React 19
- TypeScript
- Vite
- Hugging Face Transformers.js
- `Xenova/whisper-tiny.en` for speech recognition

## Getting started

### Prerequisites

- Node.js and npm
- A modern browser. Speech recording requires microphone access and browser support for `MediaRecorder`.

### Install and run

```bash
npm install
npm install @huggingface/transformers
npm run dev
```

Open the local URL printed by Vite. When prompted, allow microphone access to use speech transcription. The first inference may take longer while the model files are downloaded and cached by the browser.

> **Dependency note:** The app imports `@huggingface/transformers`, but that package is not currently listed in `package.json`. The second install command adds it to the project so the app's imports can resolve.

## Available scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite development server.        |
| `npm run build`   | Type-check and create a production build. |
| `npm run lint`    | Run ESLint.                               |
| `npm run preview` | Preview the production build locally.     |

## How to use

1. Type text into the sentiment analysis input. The predicted label and confidence appear below it.
2. In the speech section, press and hold **Press and speak** while reading the sample sentence.
3. Release the button to stop recording and view the transcription.

## Project status

This is a demo/playground rather than a production speech or sentiment service. The speech example computes a comparison score internally, but currently displays only the transcript. Other files in the repository contain experimental translation and text-generation examples that are not wired into the main interface.
