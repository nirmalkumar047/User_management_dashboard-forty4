import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../services/api';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
    try {
        const response = await userAPI.getAllUsers();
        setUsers(response.data);
        setLoading(false);
    } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
    }
};

// Optional: Add a refresh button to reload users
const handleRefresh = () => {
    setLoading(true);
    setError('');
    fetchUsers();
};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

return (
    <div className="dashboard">
        <header className="dashboard-header">
            <h1>
                <span role="img" aria-label="dashboard">📊</span> User Dashboard
            </h1>
            <Link to="/userform" className="btn btn-primary">
                <span role="img" aria-label="add">➕</span> Add New User
            </Link>
        </header>

        <div className="dashboard-stats">
            <div className="stat-card">
                <span role="img" aria-label="users">👥</span>
                <div>
                    <div className="stat-number">{users.length}</div>
                    <div className="stat-label">Total Users</div>
                </div>
            </div>
            {/* Add more stat cards here if needed */}
        </div>

        <div className="users-grid">
            {users.map(user => (
                <div key={user._id} className="user-card">
                    <div className="user-avatar">
                        <span role="img" aria-label="avatar">🧑</span>
                    </div>
                    <h3>{user.name}</h3>
                    <p>
                        <span role="img" aria-label="email">✉️</span> {user.email}
                    </p>
                    <p>
                        <span role="img" aria-label="company">🏢</span> {user.company}
                    </p>
                    <div className="card-actions">
                        <Link to={`/userdetails/${user._id}`} className="btn btn-info">
                            <span role="img" aria-label="view">🔍</span> View
                        </Link>
                        <Link to={`/edituser/${user._id}`} className="btn btn-warning">
                            <span role="img" aria-label="edit">✏️</span> Edit
                        </Link>
                        <button 
                            onClick={() => handleDelete(user._id)} 
                            className="btn btn-danger"
                        >
                            <span role="img" aria-label="delete">🗑️</span> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {users.length === 0 && (
            <div className="no-users">
                <span role="img" aria-label="empty">😕</span> No users found. Add a new user to get started!
            </div>
        )}
    </div>
);
};

export default Dashboard;
