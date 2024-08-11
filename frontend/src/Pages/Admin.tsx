import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Flashcard from '../components/Flashcard';
import FlashcardFormPopup from '../components/FlashcardFormPopup';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [flashCards, setFlashCards] = useState<{ id: number, question: string, answer: string }[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setFlashCards(response.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };
    fetchCards();
  }, [navigate]);

  const handleAddFlashcard = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNewFlashcard = (newFlashcard: { question: string, answer: string, id:number }) => {
    setFlashCards([...flashCards, newFlashcard]);
  };

  const handleDelete = (id: number) => {
    setFlashCards(flashCards.filter(flashcard => flashcard.id !== id));
  };

  return (
    <div className='overflow-x-hidden h-screen bg-gray-900'>
      <Navbar handleAddFlashcard={handleAddFlashcard} />
      <div className='grid grid-cols-3 gap-4 w-screen p-6'>
        {flashCards.map((flashcard) => (
          <Flashcard 
            key={flashcard.id} 
            initialQuestion={flashcard.question} 
            initialAnswer={flashcard.answer}
            id={flashcard.id}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {showPopup && 
        <FlashcardFormPopup
          onClose={handleClosePopup}
          onAddFlashcard={handleNewFlashcard}
        />
      }
    </div>
  );
};

export default Admin;
