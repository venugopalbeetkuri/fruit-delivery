import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { LoginModal } from './LoginModal';

export function UserMenu() {
  const { user, logout } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Welcome, {user.name}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <User className="w-5 h-5" />
          Login
        </button>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}