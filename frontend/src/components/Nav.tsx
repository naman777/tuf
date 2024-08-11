import React from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar: React.FC= () => {
    const navigate = useNavigate();
  return (
    <nav className="bg-first text-white flex items-center justify-between p-4 shadow-md">
      <div className="text-xl font-bold">
        Take You Forward
      </div>
      <button
        onClick={()=>{
            navigate("/admin/login")
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Admin Login
      </button>
    </nav>
  );
};

export default Navbar;
