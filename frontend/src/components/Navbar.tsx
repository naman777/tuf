import React from 'react';
import { useNavigate } from 'react-router-dom';
interface NavbarProps {
  handleAddFlashcard: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleAddFlashcard }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
        return (
    <nav className="bg-first text-white flex items-center justify-between p-4 shadow-md">
      <div className="text-xl font-bold">
        Admin Panel
      </div>
      <div className='grid grid-cols-2 gap-2'>
            <button
            
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2  rounded-lg hover:bg-red-700"
            >
            Logout
            </button>
      <button
        onClick={handleAddFlashcard}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
        Add Flashcard
      </button>
    </div>
    </nav>
  );
};

export default Navbar;
