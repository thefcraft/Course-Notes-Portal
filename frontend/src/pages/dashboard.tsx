import React, { useState, ReactNode } from 'react';
import { 
  FileText, 
  Download, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen 
} from 'lucide-react';

import { Loading } from '@/components/utils';
import Footer from "@/components/footer";

const StatCard = ({ icon, title, value, color }: { icon: ReactNode, title: string, value: string, color: string }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md flex items-center ${color}`}>
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const RecentNoteCard = ({ title, author, downloads, rating }: { title: string, author: string, downloads: number, rating: number }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-600 text-sm">Uploaded by {author}</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="flex items-center">
        <Download size={16} className="mr-1 text-gray-600" /> {downloads}
      </span>
      <span className="flex items-center">
        <Star size={16} className="mr-1 text-yellow-500" /> {rating}
      </span>
    </div>
  </div>
);

const Dashboard = () => {
  const [recentNotes] = useState([
    { 
      title: 'Advanced Algorithms', 
      author: 'John Doe', 
      downloads: 342, 
      rating: 4.5 
    },
    { 
      title: 'Machine Learning Basics', 
      author: 'Jane Smith', 
      downloads: 256, 
      rating: 4.8 
    },
    { 
      title: 'Data Structures', 
      author: 'Mike Johnson', 
      downloads: 421, 
      rating: 4.3 
    }
  ]);

  const stats = [
    {
      icon: <FileText size={36} className="text-blue-500" />,
      title: 'Total Notes',
      value: '1,234',
      color: 'border-l-4 border-blue-500'
    },
    {
      icon: <Download size={36} className="text-green-500" />,
      title: 'Total Downloads',
      value: '45,678',
      color: 'border-l-4 border-green-500'
    },
    {
      icon: <Users size={36} className="text-purple-500" />,
      title: 'Active Users',
      value: '567',
      color: 'border-l-4 border-purple-500'
    },
    {
      icon: <TrendingUp size={36} className="text-red-500" />,
      title: 'Top Rated',
      value: '89%',
      color: 'border-l-4 border-red-500'
    }
  ];

  return (
    <div>
      <div className='text-center h-0'>Just Auth done yet [working on other pages ] ... <br/> Go to /signup and other auth related pages</div>
      <Loading/>
      <div className='h-screen'></div>
      <Footer/>
    </div>
    // <div className="space-y-6">
    //   <div className="flex items-center mb-6">
    //     <BookOpen className="mr-3 text-blue-600" size={32} />
    //     <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
    //   </div>

    //   {/* Stats Grid */}
    //   <div className="grid grid-cols-4 gap-6">
    //     {stats.map((stat, index) => (
    //       <StatCard 
    //         key={index}
    //         icon={stat.icon}
    //         title={stat.title}
    //         value={stat.value}
    //         color={stat.color}
    //       />
    //     ))}
    //   </div>

    //   {/* Recent Notes */}
    //   <div className="bg-white p-6 rounded-lg shadow-md">
    //     <h2 className="text-2xl font-semibold mb-4">Recent Notes</h2>
    //     <div className="space-y-4">
    //       {recentNotes.map((note, index) => (
    //         <RecentNoteCard 
    //           key={index}
    //           title={note.title}
    //           author={note.author}
    //           downloads={note.downloads}
    //           rating={note.rating}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dashboard;