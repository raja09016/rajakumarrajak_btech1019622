// frontend/src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/login');
  };

  const closeMenu = () => setOpen(false);

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-2 text-lg sm:text-xl font-bold text-blue-600"
          >
            <LayoutDashboard size={22} />
            <span>TaskManager</span>
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600 truncate max-w-[220px]">
              Welcome, {user.name}
            </span>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <User size={18} />
              <span className="text-sm">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden pb-3">
            <div className="px-2 py-2 rounded-lg bg-gray-50 border border-gray-200">
              <div className="px-2 pb-2 text-sm text-gray-700">
                <span className="font-medium">Welcome,</span>{' '}
                <span className="break-words">{user.name}</span>
              </div>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition"
              >
                <User size={18} />
                <span className="text-sm">Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full mt-1 flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <LogOut size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
