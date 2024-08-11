import { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardDisplay from '../components/FlashcardDisplay';
import Navbar from '../components/Nav';

const Home = () => {
  const [flashcards, setFlashcards] = useState<{ id: number, question: string, answer: string }[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://tuf-dd5r.onrender.com/api/user/");
        setFlashcards(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="relative h-screen overflow-x-hidden bg-gray-900" >
        <Navbar/>
        
        <div className="flex items-center justify-center h-full">
            <FlashcardDisplay flashcards={flashcards} />
        </div>
    </div>
  );
};

export default Home;
