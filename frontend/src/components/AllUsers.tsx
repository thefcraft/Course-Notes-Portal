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
import { Loading } from "@/components/utils";
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

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/users/get-users`
            );
            setUsers(response.data.users);
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
            <div className="flex flex-col gap-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="border flex justify-between items-center rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        onClick={() => navigate(`#`)}
                    >
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">{user.name}</h2>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{user.role}</h4>
                    </div>
                ))}
            </div>

            <FABMenu items={menuItems} />

            {updateRolePop && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-50" onClick={handleAutoClosePopup}>
                    <div className="w-full max-w-2xl mx-2" ref={updateRoleRef}>
                        <UpdateRole users={users} updateRole={updateRole} closePopup={closePopup} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllCourses;
