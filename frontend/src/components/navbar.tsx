import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from "@/components/icons"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md w-full flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input 
            type="text" 
            placeholder="Search notes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-l-md px-3 py-2 w-64"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            <Icons.search size={20} />
          </button>
        </form>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-blue-500">
          <Icons.bell size={24} />
        </button>
        
        <Link to="/profile" className="text-gray-600 hover:text-blue-500">
          <Icons.user size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;