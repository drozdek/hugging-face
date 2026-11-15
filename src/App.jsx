import { useEffect, useRef, useState } from "react";
import { pipeline } from "@huggingface/transformers";
import { SpeechAnalyzer } from "./Sa";
import "./App.css";

function App() {

  const [userText, setUserText] = useState("");
  const [textSentiment, setTextSentiment] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleChange = async (e) => {
    setUserText(e?.target.value || "");
  }

  const runPipeline = async () => {
    const classifier = await pipeline("sentiment-analysis");
    const result = await classifier(userText);
    return result;
  }

  useEffect(() => {
    runPipeline().then(result => {
      console.log('Sentiment analysis result: ', result);
      setTextSentiment(result[0].label + " (" + result[0].score.toFixed(2) + ")");
    })
  }, [userText]);


  return (
    <>
      <h1>Hugging face: Transformers.js</h1>
      <h2>ML-powered React application</h2>

      <div className="container">
        <h3>1. Enter text for sentiment analysis:</h3>
        <input type="text" onInput={(e) => handleChange(e)} />
        <textarea value={textSentiment} onChange={() => { }} />
        <br /><br />
        <h3>2. Record your voice and analyze it with AI:</h3>
        <SpeechAnalyzer />
      </div >
    </>
  );
}

export default App;