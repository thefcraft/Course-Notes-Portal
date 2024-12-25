import { useState, useEffect, useMemo } from 'react';
import { Trash2, X } from "lucide-react";

type Props = {
    users: any;
    updateRole: (userId: string, newRole: string) => void;
    closePopup: () => void;
};

const UpdateRole = ({ users, updateRole, closePopup }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredUsers = useMemo(() => {
        return users
            .filter((user: any) => user.role !== 'admin')
            .filter((user: any) => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, users]);

    const handleRoleChange = (userId: string, newRole: string) => {
        updateRole(userId, newRole);
    };

    return (
        <div className="max-w-lg mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-95 mt-4 shadow-md dark:shadow-xl rounded-lg p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">Update User Role</h2>
                <button
                    aria-label="Close"
                    className="hover:bg-gray-200 dark:hover:bg-zinc-700 p-1 rounded"
                    onClick={closePopup}
                >
                    <X className="h-5 w-5 cursor-pointer" />
                </button>
            </div>

            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Users"
                    className="w-full p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    aria-label="Search Users"
                />
            </div>

            {filteredUsers.length === 0 ? (
                <p
                    className="text-center text-gray-500"
                    aria-live="polite"
                >
                    No users found
                </p>
            ) : (
                <div className="space-y-4">
                    {filteredUsers.map((user: any) => (
                        <div key={user._id} className="flex justify-between items-center gap-2">
                            <span className="dark:text-white">{user.name}</span>
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                className="p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                aria-label={`Change role for ${user.name}`}
                            >
                                <option value="user">User</option>
                                <option value="cr">Class Representative</option>
                            </select>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpdateRole;
