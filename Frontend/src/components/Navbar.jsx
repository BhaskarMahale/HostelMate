import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/layout.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">🏠 HostelMate</div>
      <div className="navbar-right">
        <span className="navbar-user">{user?.name} ({user?.role})</span>
        <button className="btn-logout" onClick={handleLogout}>
          ⬅ Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;