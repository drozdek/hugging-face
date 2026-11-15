import React, { useState, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';

const SpeechAnalyzer = ({ targetText = "Say some long sentence here..." }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const calculateAccuracy = (original, transcribed) => {
        const orig = original.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
        const trans = transcribed.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();

        if (orig === trans) return 100;

        const origWords = orig.split(' ');
        const transWords = trans.split(' ');
        const matches = origWords.filter(word => transWords.includes(word)).length;

        return Math.round((matches / origWords.length) * 100);
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
        mediaRecorder.current.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
            analyzeSpeech(audioBlob);
        };

        mediaRecorder.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        setIsRecording(false);
    };

    const analyzeSpeech = async (blob) => {
        setIsProcessing(true);
        try {
            const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
            const audioURL = URL.createObjectURL(blob);
            const audio = new Audio(audioURL);
            audio.play();

            const output = await transcriber(audioURL);
            const score = calculateAccuracy(targetText, output.text);

            setResult({
                text: output.text,
                score: score
            });
        } catch (error) {
            console.error("Error", error);
        }
        setIsProcessing(false);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h3>Say sentence:</h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>"{targetText}"</p>

            <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                style={{ backgroundColor: isRecording ? 'red' : 'green', color: 'white', padding: '10px 20px' }}
            >
                {isRecording ? 'Release to stop' : 'Press and speak'}
            </button>

            {isProcessing && <p>Analyzing speech with AI...</p>}

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <p>I just heard: <i>"{result.text}"</i></p>
                </div>
            )}

        </div>
    );
};

export { SpeechAnalyzer };