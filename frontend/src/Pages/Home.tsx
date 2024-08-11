import { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardDisplay from '../components/FlashcardDisplay';
import Navbar from '../components/Nav';
import { Spinner } from '../components/Spinner';

const Home = () => {
  const [flashcards, setFlashcards] = useState<{ id: number, question: string, answer: string }[]>([]);
    const [loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://tuf-dd5r.onrender.com/api/user/");
        setLoading(false);
        setFlashcards(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="relative h-screen overflow-x-hidden" >
        <Navbar/>
        
        <div className="flex items-center justify-center h-full">
            <FlashcardDisplay flashcards={flashcards} />
        </div>
        {
            loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
                <div className="text-white"><Spinner/></div>
            </div>
        }
    </div>
  );
};

export default Home;
