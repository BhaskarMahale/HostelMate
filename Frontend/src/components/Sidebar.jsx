import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/layout.css';

const Sidebar = () => {
  const { user } = useAuth();

  const adminLinks = [
    { to: '/admin',            label: '📊 Dashboard'  },
    { to: '/admin/complaints', label: '⚠ Complaints' },
    { to: '/admin/payments',   label: '💳 Payments'   },
  ];

  const studentLinks = [
    { to: '/student',            label: '📊 Dashboard'  },
    { to: '/student/complaints', label: '⚠ Complaints' },
    { to: '/student/payments',   label: '💳 Payments'   },
    { to: '/student/qr',         label: '📷 QR Entry'   },
  ];

  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="sidebar">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;