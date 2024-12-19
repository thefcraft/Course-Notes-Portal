import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Sparkles, Trash2 } from 'lucide-react';
import FABMenu from './FABmenu';
import NotesUpload from './upload';
import DelNotes from './DelNotes';

type Note = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  accessType: string;
  course: string;
  fileUrl: string;
  fileName: string;
};

const ViewCourses = () => {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [addNotesPop, setAddNotesPop] = useState(false);
  const [delNotesPop, setDelNotesPop] = useState(false); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/content/course/${id}`);
        setCourseName(response.data.courseName);
        setNotes(response.data.notes);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch notes');
      }
    };

    fetchNotes();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-8">{error}</div>;
  }

  const handleAddNotes = () => {
    setAddNotesPop(true);
  };

  const handleDeleteNotes = () => {
    setDelNotesPop(true);
  };

  const closeAddNotesPopup = () => {
    setAddNotesPop(false);
  };

  const closeDelNotesPopup = () => {
    setDelNotesPop(false); 
  };

  const menuItems = [
    {
      label: 'Add Notes',
      icon: <Sparkles className="h-5 w-5 mr-2 text-gray-300" />,
      onClick: handleAddNotes,
    },
    {
      label: 'Delete Notes',
      icon: <Trash2 className="h-5 w-5 mr-2 text-gray-300" />,
      onClick: handleDeleteNotes,
    },
  ];

  return (
    <div className="max-w-4xl mt-4 mx-auto bg-white dark:bg-zinc-900 dark:bg-opacity-30 shadow-lg dark:shadow-xl rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{courseName}</h2>
      <h3 className="text-2xl font-medium mb-6 text-gray-600 dark:text-gray-300">Course Notes</h3>

      <table className="min-w-full table-auto bg-white dark:bg-zinc-900 rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-800">
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Title</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">Tags</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr
              key={note._id}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
              onClick={() => window.location.href = `/view/${note._id}`}
            >
              <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{note.title}</td>
              <td className="py-2 px-4 max-w-[150px] text-gray-600 dark:text-gray-400 truncate">{note.description}</td>
              <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{note.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FABMenu items={menuItems} />

      {addNotesPop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-full">
            <NotesUpload closePopup={closeAddNotesPopup} courseName={courseName} />
          </div>
        </div>
      )}

      {delNotesPop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="p-6 rounded-lg shadow-lg max-w-md w-full">
            <DelNotes notes={notes} closePopup={closeDelNotesPopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;
