import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle,FaHome } from "react-icons/fa";

const NotFound404 = () => {
  return (
    <div className="">
     <div className="flex flex-col justify-center items-center bg-gradient-to-br py-3 h-[90vh] from-gray-50 to-red-100 text-gray-800 px-4">
      <FaExclamationTriangle className="text-[60px] md:text-[100px] text-yellow-500 mb-4" />
      <h1 className="text-5xl md:text-6xl font-bold my-1">404</h1>
      <p className="text-xxl md:text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="mb-6 text-sm md:text-md text-center max-w-md text-red-800">
        Looks like you've hit a dead end. The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="px-4 py-2 flex items-center gap-3 bg-gradient-to-br  from-red-100 to-blue-200 rounded-lg text-lg"
      >
        <FaHome/> Go Back to Dashboard
      </Link>
    </div>
      
    </div>
  )
}

export default NotFound404;

