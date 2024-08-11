// components/FlashcardFormPopup.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface FlashcardFormPopupProps {
  onClose: () => void;
  onAddFlashcard: (newFlashcard: { question: string, answer: string, id:number }) => void;
}

const FlashcardFormPopup: React.FC<FlashcardFormPopupProps> = ({ onClose, onAddFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://tuf-dd5r.onrender.com/api/admin/',
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      onAddFlashcard(response.data.flashcard);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-white">Add Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-white font-bold mb-2">
              Question:
            </label>
            <input
              type="text"
              id="question"
              className="w-full px-3 py-2 border rounded-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-white font-bold mb-2">
              Answer:
            </label>
            <input
              type="text"
              id="answer"
              className="w-full px-3 py-2 border rounded-lg"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlashcardFormPopup;
