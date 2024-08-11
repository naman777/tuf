import axios from 'axios';
import Flashcard from '../components/Flashcard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [flashCards, setFlashCards] = useState<{id: number, question: string, answer: string}[]>([]);
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

    const handleDeleteFlashcard = (id: number) => {
        setFlashCards(flashCards.filter(flashcard => flashcard.id !== id));
    };

    return (
        <div className='grid grid-cols-3 gap-4 bg-gray-900 w-screen p-6'>
            {flashCards.map((flashcard) => (
                <Flashcard 
                    key={flashcard.id} 
                    initialQuestion={flashcard.question} 
                    initialAnswer={flashcard.answer}
                    id={flashcard.id}
                    onDelete={handleDeleteFlashcard}  
                />
            ))}
        </div>
    );
};

export default Admin;
