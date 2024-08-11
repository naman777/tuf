import React, { useState } from 'react';

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
    return <div>No flashcards available.</div>;
  }

  const { question, answer } = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-80 h-60 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg cursor-pointer bg-stone-300 mb-4"
        onClick={handleFlip}
      >
        {flipped ? (
          <div className="text-xl font-bold text-center">{answer}</div>
        ) : (
          <div className="text-xl font-bold text-center">{question}</div>
        )}
      </div>
      <div className="flex justify-between w-full max-w-xs">
        <button
          onClick={handlePrevious}
          className="bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-800 text-sm"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-800 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardDisplay;
