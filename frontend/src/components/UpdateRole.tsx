import { useState, useEffect, useMemo } from 'react';
import { Trash2, X } from "lucide-react";
import { User } from '@/lib/types';

interface UpdateRoleProps{
    users: User[];
    updateRole: (userId: string, newRole: string) => void;
    closePopup: () => void;
};

const UpdateRole = ({ users, updateRole, closePopup }: UpdateRoleProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredUsers = useMemo(() => {
        return users
            .filter((user: User) => user.role !== 'admin')
            .filter((user: User) => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, users]);

    const handleRoleChange = (userId: string, newRole: string) => {
        updateRole(userId, newRole);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-90 shadow-lg rounded-lg p-6 pt-4">
            <div className=" flex  justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Update User Role</h2>
              <button
                aria-label="Close"
                onClick={closePopup}
                className=" text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 focus:outline-none"
              >
                <X className="w-5 h-5" />
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
                <div className="space-y-4 max-h-[70vh] overflow-y-auto px-6 scrollbar scrollbar-rounded">
                    {filteredUsers.map((user: User) => (
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
                    {filteredUsers.map((user: User) => (
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
