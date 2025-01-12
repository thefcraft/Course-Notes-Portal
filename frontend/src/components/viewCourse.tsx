import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, FileText, Sparkles, Trash2 } from 'lucide-react';
import FABMenu from '@/components/FABMenu';
import NotesUpload from '@/components/upload';
import DelNotes from '@/components/DelNotes';
import { Content as Note, User, Course as TypeCourse  } from '@/lib/types';
import { API_URL } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loading, Space } from '@/components/utils';
import { cn } from '@/lib/utils';
import AskConfirmation from '@/components/ask-confirmation';
const dateFormater = (rawDate: string) => {
    // Create a Date object from the raw string
    const date = new Date(rawDate);
    // Format the date using toLocaleString
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
    });
    return formattedDate;
};

const ViewCourses = ({user}: { user: User | null }) => {
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [course, setCourse] = useState<TypeCourse | null>(null);
  const [sortedNotes, setSortedNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addNotesPop, setAddNotesPop] = useState(false);
  const [delNotesPop, setDelNotesPop] = useState(false);
  const addNotesRef = useRef<HTMLDivElement | null>(null);
  const delNotesRef = useRef<HTMLDivElement | null>(null);
  const [addNotesIsEmpty, setAddNotesIsEmpty] = useState<boolean>(true);
  const [enrollPop, setEnrollPop] = useState(false); 
  const [unenrollPop, setUnenrollPop] = useState(false); 

  const navigate = useNavigate();
  
  const [sortConfig, setSortConfig] = useState<{
    key: "title" | "description" | "tags" | "date";
    direction: "ascending" | "descending";
  }>({
    key: 'date',
    direction: 'descending',
  });

  // Function to handle sorting
  const handleSort = (column: "title" | "description" | "tags" | "date", _notes?:Note[]) => {
    const newDirection = sortConfig.key === column && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key: column, direction: newDirection });
    // Sorting function
    setSortedNotes([...(_notes?_notes:notes)].sort((a, b) => {
      let aValue = '';
      let bValue = '';
      if (column === 'date') {
        aValue = a.createdAt;
        bValue = b.createdAt;
      }else if(column === 'title'){
        aValue = a.title;
        bValue = b.title;
      }
      else if(column === 'description'){
        aValue = a.description;
        bValue = b.description;
      }
      else if(column === 'tags'){
        aValue = a.tags.join(',');
        bValue = b.tags.join(',');
      }

      // Sort based on the direction (ascending or descending)
      if (aValue < bValue) {
        return newDirection === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return newDirection === 'ascending' ? 1 : -1;
      }
      return 0;
    }));
  };
  
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/content/course/${id}`);
      setCourse(response.data);
      setNotes(response.data.notes);
      handleSort("date", response.data.notes);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch notes');
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-8">{error}</div>;
  }
  
  if (user === null || course === null) return <Loading/>;

  const isAuthorized = () => {
    const role = user.role;
    return role === "cr" || role === "admin";
  };

  const isCanEnroll = () => {
    return (user.semester == course.semester && (course.branch.includes(user.branch) || course.branch.length === 0))
  }
  const isEnrolled = () => {
    return user.enrolledCourses.includes(course._id)
  }

  const handleAddNotes = () => {
    setAddNotesPop(true);
  };

  const handleDeleteNotes = () => {
    setDelNotesPop(true);
  };

  const closeAddNotesPopup = () => {
    fetchNotes()
    setAddNotesPop(false);
  };

  const closeDelNotesPopup = () => {
    fetchNotes()
    setDelNotesPop(false);
  };
  const handleAutoCloseAddNote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (addNotesRef.current && addNotesRef.current.contains(e.target as Node)) return;
    if (!addNotesIsEmpty) return;
    closeAddNotesPopup();
    setAddNotesIsEmpty(true);
  }
  const handleAutoCloseDelNote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (delNotesRef.current && delNotesRef.current.contains(e.target as Node)) return;
    closeDelNotesPopup();
  }

  const handleEnrollment = async () => {
    try {
			const response = await axios.post(`${API_URL}/content/course/enroll`, { courseId: course._id});
      alert("Enrolled successfully!");
      setEnrollPop(false);
			navigate(0);
		} catch (error: any) {
			console.error("Error Enrolling course:", error);
      alert(`Error: ${error?.response?.data?.error}`);
			throw error;
		}
    // finally {
      // setLoading(false);
    // }
  }
  const handleUnenrollment = async () => {
    try {
			const response = await axios.post(`${API_URL}/content/course/unenroll`, { courseId: course._id});
      alert("Unenrolled successfully!");
      setUnenrollPop(false);
			navigate(0);
		} catch (error: any) {
			console.error("Error Unenrolling course:", error);
      alert(`Error: ${error?.response?.data?.error}`);
			throw error;
		}
  }

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
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Link to="/all-courses" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2 transition-colors duration-200">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Courses
    </Link>
    <div className="max-w-4xl mt-4 bg-white dark:bg-zinc-900 dark:bg-opacity-30 shadow-lg dark:shadow-xl rounded-lg p-6 border-t-2">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{course.courseCode || course.courseName}</h2>
      <p className="text-gray-600 mb-4">{course.description || <span className='font-light'>No description</span>}</p>
      {
        isCanEnroll()?
        <div className='flex justify-end w-full'>
          {
            !isEnrolled()?
            <Button onClick={() => setEnrollPop(true)} variant="default">
              Enroll
            </Button>
            :
            <Button onClick={() => setUnenrollPop(true)} variant="destructive">
              Unenroll
            </Button>
          }
        </div>
        :
        <p className="text-red-500">You are not eligible to enroll in this course.</p>
      }
      <h3 className={cn("text-2xl font-medium mb-6 text-gray-600 dark:text-gray-300", notes.length === 0?"hidden":"")}>Course Notes</h3>
      <div className='w-full overflow-x-auto scrollbar scrollbar-rounded pb-1'>
      <table className={cn("min-w-full table-auto bg-white dark:bg-zinc-900 rounded-lg", notes.length === 0?"hidden":"")}>
        <thead>
          <tr className="bg-gray-200 dark:bg-zinc-800">
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
              <pre className="cursor-pointer select-none" onClick={() => handleSort('title')}>Title<Space/>{sortConfig.key === 'title'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre> 
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
              <pre className="cursor-pointer select-none" onClick={() => handleSort('description')}>Description<Space/>{sortConfig.key === 'description'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
              <pre className="cursor-pointer select-none" onClick={() => handleSort('tags')}>Tags<Space/>{sortConfig.key === 'tags'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
            </th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
              <pre className="cursor-pointer select-none" onClick={() => handleSort('date')}>Date<Space/>{sortConfig.key === 'date'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedNotes.map((note) => (
            <tr
              key={note._id}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
              onClick={() => window.location.href = `/view-course/${id}/view/${note._id}`}
            >
              <td className="py-2 px-4 text-gray-800 dark:text-gray-200">{note.title}</td>
              <td className="py-2 px-4 max-w-[150px] text-gray-600 dark:text-gray-400 truncate">{note.description}</td>
              <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{note.tags.join(', ')}</td>
              <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{dateFormater(note.uploadedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {notes.length === 0 && <div className='text-center mt-3 px-1 py-3 bg-gray-50 dark:bg-zinc-900 min-w-full'>We don't have notes for {course.courseCode || course.courseName} at the moment.<br/>Please check back later.</div>}

      {enrollPop && <AskConfirmation title={'Enroll'} confirmText={'Enroll'} description={'Are you sure you want to Enroll in this course?'} onClickConfirm={handleEnrollment} onClickCancel={() => {setEnrollPop(false)}}/>}
      {unenrollPop && <AskConfirmation variant='destructive' title={'Unenroll'} confirmText={'Unenroll'} description={'Are you sure you want to Unenroll from this course?'} onClickConfirm={handleUnenrollment} onClickCancel={() => {setUnenrollPop(false)}}/>}

      {
        isAuthorized() && (
          <FABMenu items={menuItems} />
        )
      }

      {
        isAuthorized() &&
        addNotesPop && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50" onClick={handleAutoCloseAddNote}>
            <div className="max-h-[80vh] w-full max-w-2xl mx-2" ref={addNotesRef}>
              <NotesUpload closePopup={closeAddNotesPopup} courseName={course.courseName} setIsEmpty={setAddNotesIsEmpty} />
            </div>
          </div>
        )}

      {
        isAuthorized() &&
        delNotesPop && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50" onClick={handleAutoCloseDelNote}>
            <div className="max-w-md w-full mx-2" ref={delNotesRef}>
              <DelNotes notes={notes} closePopup={closeDelNotesPopup} />
            </div>
          </div>
        )}
    </div>
  </div>
  );
};

export default ViewCourses;
