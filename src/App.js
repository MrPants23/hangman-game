import React, { useState, useEffect } from 'react';
import './App.css';
import Figure from './components/Figure';
import Header from './components/Header';
import Popup from './components/Popup';
import Word from './components/Word';
import WrongLetters from './components/WrongLetters';
import Notification from './components/Notification';
import { showNotification as show } from './helpers/helpers';
import Loading from './components/Loading';

const App = () => {

  const getRandomWord = async () => {
    let response = await fetch('https://random-word-api.herokuapp.com/word');
    let data = await response.json();
    setSelectedWord(data[0]);
  }

  const [playable, setPlayable] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;

      if (playable) {
        if (keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();

          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setShowNotification);
            }
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    getRandomWord();
    setPlayable(true);
  }, [])

  const playAgain = () => {
    setSelectedWord('');
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    getRandomWord();
  }

  return (
    <div>
      {selectedWord !== '' ? (
        <>
          <Header />
          <div className='game-container'>
            <Figure wrongLetters={wrongLetters} />
            <WrongLetters wrongLetters={wrongLetters} />
            <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          </div>
          <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
          <Notification showNotification={showNotification} />
        </>
      ) : (<Loading />)
      }
    </div>
  );
}

export default App;