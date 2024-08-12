import React, { useState } from 'react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import "../css/flipcard.css"


interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardDisplayProps {
  flashcards: Flashcard[];
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  if (flashcards.length === 0) {
    return <div className='text-black font-extrabold text-2xl'></div>;
  }

  const { question, answer } = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <div className="flashcard-container mb-4" onClick={handleFlip}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-content flashcard-front text-white font-extrabold text-2xl">
            {question}
          </div>
          <div className="flashcard-content flashcard-back text-black font-extrabold text-2xl">
            {answer}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-xs">
        <button
          onClick={handlePrevious}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800 text-sm flex items-center space-x-2 font-bold"
        >
          <MdKeyboardDoubleArrowLeft />
          Previous
        </button>
        <div className=''>

          <button
            onClick={handleNext}
            className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-800 text-sm flex items-center space-x-2 font-bold"
            >
            Next
            <MdKeyboardDoubleArrowRight />
          </button>
          </div>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
