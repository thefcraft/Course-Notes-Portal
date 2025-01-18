import { useState, useEffect, useMemo } from 'react';
import { Trash2, X } from "lucide-react";
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';

interface UpdateRoleProps{
    users: User[];
    updateRole: (userId: string, newRole: string) => void;
    closePopup: () => void;
};

const UpdateRole = ({ users, updateRole, closePopup }: UpdateRoleProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredUsers = useMemo(() => {
        return users
            // .filter((user: User) => user.role !== 'admin')
            .filter((user: User) => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, users]);

    const handleRoleChange = (userId: string, newRole: string) => {
        updateRole(userId, newRole);
    };

    return (
        <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-950 dark:bg-opacity-90 shadow-lg rounded-lg p-6 pt-4">
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
                <div className="space-y-4 max-h-[70vh] overflow-y-auto px-2 scrollbar scrollbar-rounded">
                    <table className={cn("min-w-full table-auto bg-white dark:bg-zinc-900 rounded-lg", users.length === 0?"hidden":"")}>
                        <thead>
                          <tr className="bg-gray-200 dark:bg-zinc-800">
                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                              <pre className="select-none">Name</pre> 
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                              <pre className="select-none">Email</pre> 
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-gray-700 dark:text-gray-200">
                              <pre className="select-none">Role</pre> 
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user: User) => (
                          <tr
                            key={user._id}
                            className="hover:bg-gray-100 dark:hover:bg-zinc-700"
                          >
                            <td className="py-2 px-4 max-w-[350px] text-gray-800 dark:text-gray-200 truncate">{user.name||'-'}</td>
                            <td className="py-2 px-4 max-w-[300px] text-gray-600 dark:text-gray-400 truncate">{user.email||'-'}</td>
                            <td className="py-2 px-4 max-w-[220px] w-[220px] text-gray-600 dark:text-gray-400">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="p-2 border rounded dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    aria-label={`Change role for ${user.name}`}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="cr">Class Representative</option>
                                </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UpdateRole;
