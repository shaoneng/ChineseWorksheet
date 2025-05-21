import React, { useState } from 'react';
import wordListDefault from './wordList.js'; // Assuming wordList.js exports the list as default
import './Flashcard.css';

const Flashcard = () => {
  const [words, setWords] = useState(wordListDefault); // Renamed to words to avoid conflict with imported wordList
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const showNextCard = () => {
    if (words.length <= 1) {
      return; // No other card to show or list is empty
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * words.length);
    } while (newIndex === currentCardIndex);

    setCurrentCardIndex(newIndex);
    setShowDefinition(false);
  };

  const toggleDefinition = () => {
    setShowDefinition(!showDefinition);
  };

  if (!words || words.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="word">No words available</div>
        </div>
        <div className="flashcard-buttons">
          <button disabled>Show Definition</button>
          <button disabled>Next Word</button>
        </div>
      </div>
    );
  }

  const currentCard = words[currentCardIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <div className="word">{currentCard.word}</div>
        {showDefinition && (
          <div className="definition">{currentCard.definition}</div>
        )}
      </div>
      <div className="flashcard-buttons">
        <button onClick={toggleDefinition}>
          {showDefinition ? 'Hide Definition' : 'Show Definition'}
        </button>
        <button onClick={showNextCard} disabled={words.length <= 1}>
          Next Word
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
