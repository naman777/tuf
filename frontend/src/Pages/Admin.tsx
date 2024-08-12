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
        navigate("/admin/login");
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
    <div className='overflow-x-hidden h-screen '>
      <Navbar handleAddFlashcard={handleAddFlashcard} />
      <div className="relative h-full w-full bg-white"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className='grid grid-cols-3 gap-4 w-screen p-6 relative z-10'>
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
    </div>
  );
};

export default Admin;
