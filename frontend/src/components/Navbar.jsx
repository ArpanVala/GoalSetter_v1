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
      <Link to='/register' className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer text-center">
        <button>Get Started</button>
      </Link>
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
          className="md:hidden text-gray-700 focus:outline-none text-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        > {menuOpen ? (
          <FaAngleUp />
        ) : (
          <FaAlignRight />
        )}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex text-gray-500 items-center gap-6 text-[15px] font-medium ">
          {isLoggedIn ? loggedInLinks : loggedOutLinks}
        </ul>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="md:hidden text-gray-600 flex flex-col gap-4 text-[14px] font-semibold px-2 py-4">
          {isLoggedIn ? loggedInLinks : loggedOutLinks}
        </ul>
      )}

      {/* Divider */}
      <div className='border border-gray-200 md:border-gray-100'></div>
    </div>
  );
}
