import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userAPI } from '../services/api';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getUserById(id);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user details');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div className="details-card">
        <div className="detail-item">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="detail-item">
          <strong>Phone:</strong> {user.phone}
        </div>
        <div className="detail-item">
          <strong>Company:</strong> {user.company}
        </div>
        <div className="detail-item">
          <strong>Address:</strong>
          <div className="address">
            {user.address.street && <p>{user.address.street}</p>}
            <p>{user.address.city}, {user.address.zipcode}</p>
            {user.address.geo.lat && user.address.geo.lng && (
              <p>Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</p>
            )}
          </div>
        </div>
      </div>
      <div className="actions">
        <Link to={`/edituser/${user._id}`} className="btn btn-warning">
          Edit User
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
