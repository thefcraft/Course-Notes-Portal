import  { useState } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';

const DelNotes = ({
  closePopup,
  notes,
}: {
  closePopup: () => void;
  notes: any[];
}) => {
  const [deletePop, setDeletePop] = useState(false); 
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (noteId: string) => {
    setNoteToDelete(noteId);
    setDeletePop(true); 
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/content/delete-note/${noteToDelete}`);
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
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 dark:bg-opacity-90 shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Delete Notes</h2>

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
