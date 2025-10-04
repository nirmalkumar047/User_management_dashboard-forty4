import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getUserById(id);
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user details');
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.address.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');
      if (grandchild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      await userAPI.updateUser(id, formData);
      navigate(`/user/${id}`);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading user details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-form">
      <h2>Edit User</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Company*</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error' : ''}
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label>Street Address</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>City*</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label>Zipcode*</label>
          <input
            type="text"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            className={errors.zipcode ? 'error' : ''}
          />
          {errors.zipcode && <span className="error-message">{errors.zipcode}</span>}
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input
            type="text"
            name="address.geo.lat"
            value={formData.address.geo.lat}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Longitude</label>
          <input
            type="text"
            name="address.geo.lng"
            value={formData.address.geo.lng}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? 'Updating...' : 'Update User'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/user/${id}`)} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
