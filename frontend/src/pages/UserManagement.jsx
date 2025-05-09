import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === 'admin') {
          setIsAuthorized(true);
          fetchUsers(token);
        } else {
          setLoading(false);
          setError('Access denied: Admin privileges required');
        }
      } catch (err) {
        setLoading(false);
        setError('Invalid token');
      }
    } else {
      setLoading(false);
      setError('Authentication required');
    }
  }, []);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`/api/users/${id}/role`, { role: newRole });
      fetchUsers(localStorage.getItem('authToken'));
    } catch (err) {
      alert('Failed to change role');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers(localStorage.getItem('authToken'));
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleResetPassword = async (id) => {
    try {
      await axios.post(`/api/users/${id}/reset-password`);
      alert('Password reset successfully');
    } catch (err) {
      alert('Failed to reset password');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-2xl font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold text-red-500">Access Denied</h2>
        <p className="text-gray-700">You must be an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ height: '100vh' }}>
  <div className="max-w-6xl w-full p-6">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">User Management</h1>
    <p className="mb-2 text-gray-600">
      Total Users: <strong>{filteredUsers.length}</strong>
    </p>
    <input
      type="text"
      placeholder="Search user..."
      value={searchTerm}
      onChange={handleSearch}
      className="border border-gray-300 p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id} className="text-center hover:bg-gray-50 transition-colors">
              <td className="p-3 border">{user.username}</td>
              <td className="p-3 border capitalize">{user.role}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() =>
                    handleRoleChange(user._id, user.role === 'admin' ? 'user' : 'admin')
                  }
                  style={{ backgroundColor: 'var(--primary-color)' }}
                  className="hover:brightness-110 text-white px-3 py-1 rounded transition duration-200"
                >
                  {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                </button>

                <button
                  onClick={() => handleResetPassword(user._id)}
                  style={{ backgroundColor: 'var(--accent-color)' }}
                  className="hover:brightness-110 text-white px-3 py-1 rounded transition duration-200"
                >
                  Reset
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ backgroundColor: 'var(--danger-color)' }}
                  className="hover:brightness-110 text-white px-3 py-1 rounded transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default UserManagement;
