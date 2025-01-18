import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react"; 
import FABMenu from '@/components/FABMenu';
import UpdateRole from '@/components/UpdateRole';
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { Loading, Space } from "@/components/utils";
import { cn } from "@/lib/utils";
const dateFormater = (rawDate: string) => {
    // Create a Date object from the raw string
    const date = new Date(rawDate);
    // Format the date using toLocaleString
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate;
};

const AllCourses = () => {
    const { user } = useAuthStore();
    console.log(user)
    
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [fabOpen, setFabOpen] = useState(false);
    const [updateRolePop, setUpdateRolePop] = useState(false);
    const updateRoleRef =  useRef<HTMLDivElement | null>(null);
    const [featchingUsers, setFeatchingUsers] = useState(true);
    
      const [sortedUsers, setSortedUsers] = useState<User[]>([]);

    
      const [sortConfig, setSortConfig] = useState<{
        key: "name" | "email" | "branch" | "semester" | "lastLogin" | "role";
        direction: "ascending" | "descending";
      }>({
        key: 'email',
        direction: 'descending',
      });
    
      // Function to handle sorting
      const handleSort = (column: "name" | "email" | "branch" | "semester" | "lastLogin" | "role", _users?:User[]) => {
        const newDirection = sortConfig.key === column && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key: column, direction: newDirection });
        // Sorting function
        setSortedUsers([...(_users?_users:users)].sort((a, b) => {
          let aValue = '';
          let bValue = '';
          if (column === 'lastLogin') {
            aValue = a.lastLogin;
            bValue = b.lastLogin;
          }else if(column === 'name'){
            aValue = a.name;
            bValue = b.name;
          }
          else if(column === 'email'){
            aValue = a.email;
            bValue = b.email;
          }
          else if(column === 'branch'){
            aValue = a.branch;
            bValue = b.branch;
          }else if(column === 'role'){
            aValue = a.role;
            bValue = b.role;
          }else{ // column === 'semester'
            aValue = `${a.semester}`;
            bValue = `${b.semester}`;
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
      

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/users/get-users`
            );
            setUsers(response.data.users);
            handleSort("email", response.data.users);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch courses");
        }finally{
            setFeatchingUsers(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateRole = () => {
        setFabOpen(false);
        setUpdateRolePop(true);
    };

    const closePopup = () => {
        fetchUsers()
        setUpdateRolePop(false);
    };
    
    const handleAutoClosePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (updateRoleRef.current && updateRoleRef.current.contains(e.target as Node)) return;
      closePopup();
    }


    const updateRole = async (userId: string, newRole: string) => {
    
        try {
            const response = await fetch(`${API_URL}/users/updateRole`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ userId, newRole }),
                credentials: "include"
            });
    
            const data = await response.json(); 
    
            if (response.ok) {
                toast.success("User role updated successfully!");
                fetchUsers()
                setUpdateRolePop(false);
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("An error occurred while updating the user role.");
        }
    };

    const menuItems = [
        {
            label: 'Update Role',
            icon: <Sparkles className="h-5 w-5 mr-2 text-gray-300" />,
            onClick: handleUpdateRole,
        },
    ];
    if(featchingUsers) return <Loading/>
    return (
        <div className="p-4 bg-white dark:bg-zinc-950">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 dark:text-white">All Users</h1>
            <div className="w-full overflow-x-auto scrollbar scrollbar-rounded pb-1">
                <table className={cn("min-w-full table-auto bg-white dark:bg-zinc-900 rounded-lg", users.length === 0?"hidden":"")}>
                    <thead>
                      <tr className="bg-gray-200 dark:bg-zinc-800">
                        <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                          <pre className="cursor-pointer select-none" onClick={() => handleSort('name')}>Name<Space/>{sortConfig.key === 'name'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre> 
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                          <pre className="cursor-pointer select-none" onClick={() => handleSort('email')}>Email<Space/>{sortConfig.key === 'email'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                          <pre className="cursor-pointer select-none" onClick={() => handleSort('branch')}>Branch<Space/>{sortConfig.key === 'branch'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                          <pre className="cursor-pointer select-none" onClick={() => handleSort('semester')}>Semester<Space/>{sortConfig.key === 'semester'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                          <pre className="cursor-pointer select-none" onClick={() => handleSort('lastLogin')}>LastLogin<Space/>{sortConfig.key === 'lastLogin'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                          <pre className="cursor-pointer select-none" onClick={() => handleSort('role')}>Role<Space/>{sortConfig.key === 'role'?(sortConfig.direction === 'ascending' ? '↑' : '↓'):<Space/>}</pre>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {sortedUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
                      >
                        <td className="py-2 px-4 max-w-[250px] text-gray-800 dark:text-gray-200 truncate">{user.name||'-'}</td>
                        <td className="py-2 px-4 max-w-[200px] text-gray-600 dark:text-gray-400 truncate">{user.email||'-'}</td>
                        <td className="py-2 px-4 max-w-[200px] text-gray-600 dark:text-gray-400 truncate">{user.branch||'-'}</td>
                        <td className="py-2 px-4 max-w-[250px] text-gray-600 dark:text-gray-400 truncate">{user.semester|| '-'}</td>
                        <td className="py-2 px-4 max-w-[200px] text-gray-600 dark:text-gray-400 truncate">{dateFormater(user.lastLogin)||'-'}</td>
                        <td className="py-2 px-4 max-w-[200px] text-gray-600 dark:text-gray-400 truncate">{user.role||'-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            <FABMenu items={menuItems} />

            {updateRolePop && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-50" onClick={handleAutoClosePopup}>
                    <div className="w-full max-w-6xl mx-2" ref={updateRoleRef}>
                        <UpdateRole users={users} updateRole={updateRole} closePopup={closePopup} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCourses;
