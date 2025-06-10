import React, { useState,useEffect } from 'react';
import { FaAlignRight, FaAngleUp, FaTasks } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {logout, reset} from '../features/auth/authSlice'

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // for dynamically rendering navlinks
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const loggedInLinks = (
    <>
      <li className='hover:text-gray-400 cursor-pointer'>Dashboard</li>
      <li className='hover:text-gray-400 cursor-pointer'>Categories</li>
      <li className='hover:text-gray-400 cursor-pointer'>Add Goal</li>
      <li className='px-2 py-1 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200 cursor-pointer' onClick={onLogout}>Logout</li>
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
          {user ? loggedInLinks : loggedOutLinks}
        </ul>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="md:hidden text-gray-600 flex flex-col gap-4 text-[14px] font-semibold px-2 py-4">
          {user ? loggedInLinks : loggedOutLinks}
        </ul>
      )}

      {/* Divider */}
      <div className='border border-gray-200 md:border-gray-100'></div>
    </div>
  );
}
