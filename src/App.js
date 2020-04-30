import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import './App.css';

class App extends Component {
    render() {
        const { 
            transcript, 
            resetTranscript, 
            browserSupportsSpeechRecognition 
        } = this.props

        if (!browserSupportsSpeechRecognition) {
            return null
        }

        return (
            <div className='container'>

                <span className='speechText'>You Said:</span>
                <span className='speechText'>{transcript}</span>
                <button onClick={resetTranscript} className='button'>Reset</button>
            </div>
        )
    }
}

export default SpeechRecognition(App)