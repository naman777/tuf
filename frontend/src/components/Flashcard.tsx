import { useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup'; 
import ConfirmPopup from '../components/ConfirmPopup'; 
import { Spinner } from './Spinner';

const Flashcard = ({ initialQuestion, initialAnswer, id, onDelete }: {
  initialQuestion: string;
  initialAnswer: string;
  id: number;
  onDelete: (id: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);
  const [showPopup, setShowPopup] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false); 
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false);
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
        setLoading(true);
      const response = await axios.patch(
        "https://tuf-dd5r.onrender.com/api/admin/",
        {
          question,
          answer,
          id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
        setLoading(false);
      setShowPopup(true); 
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
        setLoading(true);
      const response = await axios.delete(
        `https://tuf-dd5r.onrender.com/api/admin`,
        {
          data: {
            id
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }

      );
        setLoading(false);
      setShowPopup(true); 
      setMessage(response.data.message);
      onDelete(id);
      setShowConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setQuestion(initialQuestion);
    setAnswer(initialAnswer);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-first shadow-lg rounded-lg p-6">
      {isEditing ? (
        <div>
          <div className="">
            <label htmlFor="question" className="block text-white font-bold mb-2">
              Question:
            </label>
            <input
              type="text"
              id="question"
              className="w-full px-3 py-2 border rounded-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{question}</h3>
          <p className="text-white mb-4">{answer}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {showPopup && <Popup message={message} onClose={closePopup} />}
      {showConfirm && (
        <ConfirmPopup 
          message="Are you sure you want to delete this flashcard?" 
          onConfirm={confirmDelete} 
          onCancel={cancelDelete} 
        />
      )}
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
                <div className="text-white"><Spinner/></div>
            </div>
        }
    </div>
  );
};

export default Flashcard;
