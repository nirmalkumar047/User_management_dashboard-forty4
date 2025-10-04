import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import EditUser from './components/EditUser';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userform" element={<UserForm />} />
            <Route path="/userdetails/:id" element={<UserDetails />} />
            <Route path="/edituser/:id" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
