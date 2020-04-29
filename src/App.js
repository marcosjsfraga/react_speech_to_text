import React, { useState, useEffect } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.start();

export default function App() {
    const [count, setCount] = useState(0);
    const [youSaid, setYouSaid] = useState('');
    const [recordStatus, setRecordStatus] = useState('');

    const voiceCommands = () => {
      // On start
      recognition.onstart = () => {
          setRecordStatus('Actived');
          console.log('Voice is actived');
      }

      // Do something when we get a result
      recognition.onresult = (e) => {
          let current = e.resultIndex;
          let transcript = e.results[current][0].transcript;
          let mobileRepeatBug = (current === 1 && transcript === e.results[0][0].transcript);

          if(!mobileRepeatBug) {
              // console.log('You said: ' + transcript);
              setYouSaid(transcript);
              
              if (transcript === "próximo" || transcript === ' próximo') {
                  setCount(count + 1);
              }

              if (transcript === 'voltar' || transcript === ' voltar') {
                  setCount(count - 1);
              }
          }

          setTimeout(() => {
              recognition.start();
          }, 50);
      }

      recognition.onspeechend = () => {
          recognition.stop();
          setRecordStatus('Stopped');
          console.log('voice stopped');
      }
    }

    useEffect(() => {
        voiceCommands();
    });

    return (
        <div className="App">
            {/* <p>Counter: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button> */}
            <br/>
            <br/>
            <label>Você Falou:</label>
            <br/>
            <label>{youSaid}</label>
            <br/>
            <br/>
            <br/>
            <label>Record Status: {recordStatus}</label>
        </div>
    );
}

// export default App;