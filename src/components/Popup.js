import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    let status = checkWin(correctLetters, wrongLetters, selectedWord);

    if (status === 'win') {
        finalMessage = 'Congratulations! You won! :)';
        playable = false;
    }
    else if (status === 'lose') {
        finalMessage = 'Unfortunately, you lost! :(';
        finalMessageRevealWord = `... the word was: ${selectedWord}`;
        playable = false;
    }

    useEffect(() => {
        setPlayable(playable);
    });

    return (
        <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    );
}

export default Popup;