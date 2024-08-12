import { useEffect, useState } from 'react';
import axios from 'axios';
import FlashcardDisplay from '../components/FlashcardDisplay';
import Navbar from '../components/Nav';
import { Spinner } from '../components/Spinner';

const Home = () => {
  const [flashcards, setFlashcards] = useState<{ id: number, question: string, answer: string }[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="relative z-10 h-screen overflow-x-hidden">
      <Navbar />
      <div className="relative h-full w-full bg-white">
        <div 
          className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{ pointerEvents: 'none' }} // Disable pointer events
        ></div>
        <div className="flex items-center justify-center h-full relative z-20"> {/* Higher z-index to make it clickable */}
          <FlashcardDisplay flashcards={flashcards} />
        </div>
        {loading && 
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
            <div className="text-white"><Spinner /></div>
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
