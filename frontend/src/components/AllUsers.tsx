import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react"; 
import FABMenu from "./FABmenu";
import UpdateRole from "./UpdateRole";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const AllCourses = () => {
        const { user } = useAuthStore();
        console.log(user)
    
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [fabOpen, setFabOpen] = useState(false);
    const [updateRolePop, setUpdateRolePop] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/users/get-users`
            );
            setUsers(response.data.users);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch courses");
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

    const updateRole = async (userId: string, newRole: string) => {
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/updateRole`, {
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
                <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-50">
                    {/* <div className="p-2 rounded-lg shadow-lg max-w-md w-full bg-white dark:bg-zinc-900 dark:bg-opacity-95"> */}
                        <UpdateRole users={users} updateRole={updateRole} closePopup={closePopup} />
                    {/* </div> */}
                </div>
            )}
        </div>
    );
};

export default AllCourses;
