import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Upload, FileText, Tags, BookOpen, X } from 'lucide-react';

const NotesUpload = ({ closePopup, courseName }: {
  closePopup: () => void;
  courseName: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [accessType, setAccessType] = useState('public');
  const [course, setCourse] = useState(courseName);
  const [loading, setLoading] = useState(false);


  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);


    if (!file || !title || !description) {
      alert("Please fill all required fields: file, title, and description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("accessType", accessType);
    formData.append("course", courseName ? courseName : course);

    try {

      const response = await fetch("http://localhost:5000/api/content/upload", {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        alert("File uploaded successfully!");
        closePopup();
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading notes:", error);
      alert("Something went wrong while uploading the notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-95 mt-4 shadow-md dark:shadow-xl rounded-lg p-6">
      <button
        onClick={closePopup}
        className="absolute top-3 right-3 p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-600 dark:text-blue-400">
        <Upload className="mr-3" />
        Upload Notes
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <FileText className="mr-2" />
            File Upload
          </label>
          <input
            type="file"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <BookOpen className="mr-2" />
            Course Name
          </label>
          <input
            type="text"
            value={courseName ? courseName : course}
            onChange={(e) => setCourse(courseName ? courseName : e.target.value)}
            placeholder="Enter course name"
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white cursor-not-allowed"
            required
            disabled
          />
        </div>

        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <FileText className="mr-2" />
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notes title"
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center text-zinc-600 dark:text-zinc-300">
            <Tags className="mr-2" />
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma-separated)"
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-zinc-600 dark:text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description of the notes"
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-zinc-600 dark:text-zinc-300">Access Control</label>
          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
          >
            <option value="public">Public</option>
            <option value="branch">Restricted to Branch</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center py-2 px-4 rounded ${
            loading
              ? 'bg-blue-400 dark:bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
          } text-white focus:outline-none`}
          disabled={loading}
          >
          Upload Notes
        </button>
      </form>
    </div>
  );
};

export default NotesUpload;
