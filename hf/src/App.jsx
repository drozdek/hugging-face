import { useEffect, useRef, useState } from "react";
import { pipeline } from "@huggingface/transformers";
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
      setTextSentiment(result[0].label + " (" + result[0].score.toFixed(2) + ")");
      console.log('Pipeline result: ', result);
    })
  }, [userText]);

  // text generation example
  /**
   * Generates text based on a predefined prompt using a fine-tuned T5 model.
   * 
   * This handler initiates a text-to-text generation pipeline that answers questions
   * about Rafal Drozdowski from Poland. It uses the Xenova/LaMini-Flan-T5-783M model
   * to process the input and generate a response.
   * 
   * Pipeline options:
   * @param {number} max_new_tokens - Maximum number of new tokens to generate (default: varies by model). Controls output length.
   * @param {number} temperature - Controls randomness in output (0-2 range typical). Lower values (e.g., 0.7) make output more deterministic; higher values (e.g., 1.5) increase creativity and randomness.
   * @param {number} repetition_penalty - Penalty for repeating tokens (default: 1.0). Values > 1.0 discourage repetition; higher values (e.g., 2.0) more aggressively prevent repeated content.
   * @param {number} no_repeat_ngram_size - Prevents n-grams of this size from repeating (default: 0, disabled). Value of 1 prevents any token from repeating; 2 prevents 2-word sequences from repeating, etc.
   * 
   * @async
   * @returns {Promise<void>} Sets the generated text in component state via setGeneratedText
   */
  const generateTextHandler = async () => {
    const TEXT = "Answer only who is Rafal Drozdowski from Poland from Prabuty town?"

    const gen = async () => {
      const txt = await pipeline("text2text-generation",
        "Xenova/LaMini-Flan-T5-783M", {
        max_new_tokens: 100,
        temperature: 2,
        repetition_penalty: 1.0,
        no_repeat_ngram_size: 1,
      });
      const res = await txt(TEXT);
      console.log('Text generation result: ', res);
      setGeneratedText(res[0].generated_text);
    }
    gen().then(res => {
      console.log('Text generation result: ', res);
    });

  };


  return (
    <>
      <h1>Hugging face: Transformers.js</h1>
      <h2>ML-powered React application</h2>

      <div className="container">
        <input type="text" onInput={(e) => handleChange(e)} />
        <textarea value={textSentiment} onChange={() => { }} />
        <br /><br />
        <button onClick={() => generateTextHandler()}>Generate text</button>
        <textarea value={generatedText} onChange={() => { }} />
      </div >
    </>
  );
}

export default App;