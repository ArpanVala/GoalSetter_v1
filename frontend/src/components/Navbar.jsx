import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight, FaAngleUp, FaTasks } from "react-icons/fa";

export default function Navbar({ isLoggedIn }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const loggedInLinks = (
    <>
      <li className='hover:text-gray-400 cursor-pointer'>Dashboard</li>
      <li className='hover:text-gray-400 cursor-pointer'>Goals</li>
      <li className='hover:text-gray-400 cursor-pointer'>Categories</li>
      <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
        {/* Notification icon can go here */}
      </button>
    </>
  );

  const loggedOutLinks = (
    <>
      <li className='hover:text-gray-400 cursor-pointer'>Features</li>
      <li className='hover:text-gray-400 cursor-pointer'>
        <Link to='/login'>Log in</Link>
      </li>
      <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer">
        <Link to='/register'>Get Started</Link>
      </button>
    </>
  );

  return (
    <div className='max-w-[1048px] mx-auto px-4'>
      <nav className="flex items-center justify-between py-3">
        {/* Logo */}
        <div className="cursor-pointer">
        <Link to='/' className="flex items-center gap-2">
          <FaTasks/>
          <h1 className="font-bold text-xl">GoalSetter</h1>
          </Link>
        </div>

        {/* Hamburger for small screens */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        > {menuOpen ? (
          <FaAngleUp />
        ) : (
          <FaAlignRight />
        )}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {isLoggedIn ? loggedInLinks : loggedOutLinks}
        </ul>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 text-sm px-2 pb-4">
          {isLoggedIn ? loggedInLinks : loggedOutLinks}
        </ul>
      )}

      {/* Divider */}
      <div className='border border-gray-100'></div>
    </div>
  );
}
