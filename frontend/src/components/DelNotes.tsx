import  { useState } from 'react';
import axios from 'axios';
import { Trash, X } from 'lucide-react';
import { API_URL } from '@/lib/constants';
import { Content as Note } from '@/lib/types';
interface DelNotesProps{
  closePopup: () => void;
  notes: Note[];
}
const DelNotes = ({closePopup, notes}: DelNotesProps) => {
  const [deletePop, setDeletePop] = useState(false); 
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (noteId: string) => {
    setNoteToDelete(noteId);
    setDeletePop(true); 
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/content/delete-note/${noteToDelete}`);
      setDeletePop(false);
      closePopup();
      setNoteToDelete(null); 
    } catch {
      setError('Failed to delete note');
    }
  };

  const cancelDelete = () => {
    setDeletePop(false); 
  };

  return (
    <div className="relative max-w-md mx-auto bg-white dark:bg-black dark:bg-opacity-90 shadow-lg rounded-lg p-6 pt-4">
      <div className='flex items-center mb-6 justify-between'>
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Delete Notes</h2>
        <button
          onClick={closePopup}
          className=" text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && <div className="text-red-500 text-xl text-center mt-8">{error}</div>}

      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note._id} className="flex justify-between items-center bg-gray-100 dark:bg-zinc-800 rounded-lg p-4">
            <span className="text-lg text-gray-700 dark:text-gray-200">{note.title}</span>
            <button
              onClick={() => handleDelete(note._id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>

      {deletePop && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl text-center font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DelNotes;
