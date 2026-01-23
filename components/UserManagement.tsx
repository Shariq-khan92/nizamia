
import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { SystemUser } from '../types';
import { UserPlus, Trash2, X } from 'lucide-react';

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<SystemUser[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: 'User'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await authService.getUsers();
            // Map API response to SystemUser type if needed, assume matches
            const mappedUsers = data.map((u: any) => ({
                id: u.id,
                name: u.name,
                username: u.username,
                role: u.role,
                lastActive: new Date(u.lastActive || u.createdAt).toLocaleString()
            }));
            setUsers(mappedUsers);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authService.register(formData);
            fetchUsers();
            setIsAddModalOpen(false);
            setFormData({ name: '', username: '', password: '', role: 'User' });
        } catch (error) {
            alert('Failed to create user. Username might be taken.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">User Management</h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    <UserPlus size={18} />
                    Add User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-medium text-gray-600">Name</th>
                            <th className="p-4 font-medium text-gray-600">Username</th>
                            <th className="p-4 font-medium text-gray-600">Role</th>
                            <th className="p-4 font-medium text-gray-600">Last Active/Created</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium">{user.name}</td>
                                <td className="p-4 text-gray-500">{user.username}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{user.lastActive}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Create New User</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <select
                                    className="w-full p-2 border rounded-lg"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="User">User</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Administrator</option>
                                </select>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {isLoading ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
