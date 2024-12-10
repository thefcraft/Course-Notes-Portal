import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  Search, 
  User, 
  Star, 
  FolderPlus 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home />, text: 'Dashboard', path: '/' },
    { icon: <Upload />, text: 'Upload Notes', path: '/upload' },
    { icon: <Search />, text: 'Search Notes', path: '/search' },
    { icon: <User />, text: 'Profile', path: '/profile' },
    { icon: <Star />, text: 'Rated Notes', path: '/rated' },
    { icon: <FolderPlus />, text: 'My Uploads', path: '/my-uploads' },
  ];

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-5 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Notes Portal</h1>
      </div>
      <nav className="py-4">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className="flex items-center p-4 hover:bg-blue-50 transition-colors"
          >
            <span className="mr-3 text-gray-600">{item.icon}</span>
            <span className="text-gray-800">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;