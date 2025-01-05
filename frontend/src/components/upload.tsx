import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Upload, FileText, Tags, BookOpen, X } from 'lucide-react';
import { API_URL } from '@/lib/constants';
import { TagsInput } from "@/components/ui/tag-input";

interface NotesUploadProps{ 
  closePopup: () => void ;
  courseName: string;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>
}

const NotesUpload = ({ closePopup,courseName, setIsEmpty }: NotesUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [accessType, setAccessType] = useState('public');
  const [loading, setLoading] = useState(false);


  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(title==='' && tags.length === 0 && description==='' && e.target.files===null);
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
    formData.append("tags", tags.join(','));
    formData.append("accessType", accessType);
    formData.append("course", courseName);

    try {

      const response = await fetch(`${API_URL}/content/upload`, {
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
    <div className="relative max-w-2xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-95 shadow-md dark:shadow-xl rounded-lg py-6 ">
      <button
        onClick={closePopup}
        className="absolute top-3 right-3 p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-600 dark:text-blue-400 px-6">
        <Upload className="mr-3" />
        Upload Notes
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-6 scrollbar scrollbar-rounded">
        <div>
          {/* TODO: see => https://shadcn-extension.vercel.app/docs/file-upload */}
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
            value={courseName}
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
            onChange={(e) => {setTitle(e.target.value); setIsEmpty(e.target.value==='' && tags.length === 0 && description==='' && file===null)}}
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
          <TagsInput
            value={tags}
            onValueChange={(value: string[]) => {setTags(value); setIsEmpty(title==='' && value.length === 0 && description==='' && file===null)}}
            placeholder="Enter tags separated by comma"
            className="w-full p-1 border rounded"
          />
          {/* <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          /> */}
        </div>

        <div>
          <label className="block mb-2 text-zinc-600 dark:text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => {setDescription(e.target.value); setIsEmpty(title==='' && tags.length === 0 && e.target.value==='' && file===null)}}
            placeholder="Enter a brief description of the notes"
            className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white scrollbar"
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
