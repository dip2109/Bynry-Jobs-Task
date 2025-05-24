import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white p-4">
    <nav className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Profile Explorer</Link>
      <Link to="/admin" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
        Admin Panel
      </Link>
    </nav>
  </header>
);

export default Header;