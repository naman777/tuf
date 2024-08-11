import  { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Flashcard from '../components/Flashcard';
import FlashcardFormPopup from '../components/FlashcardFormPopup';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

const Admin = () => {
  const [flashCards, setFlashCards] = useState<{ id: number, question: string, answer: string }[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://tuf-dd5r.onrender.com/api/admin/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setLoading(false);
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
    <div className='overflow-x-hidden h-screen bg-second'>
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
      {
        loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="text-white"><Spinner/></div>
        </div>
      }
    </div>
  );
};

export default Admin;
