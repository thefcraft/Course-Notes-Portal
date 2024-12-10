import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Upload, FileText, Tags, BookOpen } from 'lucide-react';

const NotesUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [accessType, setAccessType] = useState('public');
  const [course, setCourse] = useState('');

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.files){
          const uploadedFile = e.target.files[0];
          setFile(uploadedFile);
      }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement file upload logic
    const formData = {
      file,
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      accessType,
      course
    };
    console.log('Uploading notes:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Upload className="mr-3 text-blue-600" />
        Upload Notes
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 flex items-center">
            <FileText className="mr-2 text-gray-600" />
            File Upload
          </label>
          <input 
            type="file" 
            accept=".pdf,.docx,.txt" 
            onChange={handleFileUpload}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center">
            <BookOpen className="mr-2 text-gray-600" />
            Course Name
          </label>
          <input 
            type="text" 
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center">
            <FileText className="mr-2 text-gray-600" />
            Title
          </label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notes title"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center">
            <Tags className="mr-2 text-gray-600" />
            Tags
          </label>
          <input 
            type="text" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma-separated)"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description of the notes"
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-2">Access Control</label>
          <select 
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="public">Public</option>
            <option value="branch">Restricted to Branch</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
        >
          Upload Notes
        </button>
      </form>
    </div>
  );
};

export default NotesUpload;