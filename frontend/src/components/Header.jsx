import React, { useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import iage from "../assets/userpng.png";
import { Link, NavLink } from "react-router-dom";
import { handleLogout } from "../constants/handlelogout";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 


  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/v1/auth/auth-check", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedin);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    }
    fetchData();
  }, [isloggedIn]);

  const handleLogoutClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data); // Log the response data for debugging
      if (response.ok) {
        setIsLoggedIn(false);
        
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <>
      <header className={`fixed w-full transition-all duration-300 ease-in-out z-50 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 group"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                FeedBack<span className="text-blue-600">&</span>Survey
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/serveys"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  Surveys
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  Features
                </NavLink>
              </nav>

              {/* Auth Section */}
              <div className="relative">
                {!isloggedIn ? (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Login
                  </Link>
                ) : (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <img 
                      src={iage} 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full cursor-pointer ring-2 ring-blue-500 hover:ring-purple-500 transition-all duration-300"
                    />
                    {isHovered && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                        <ul className="py-1">
                          <li>
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogoutClick}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
              >
                <IoMenu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-gradient-to-b from-white to-gray-100 z-50 md:hidden">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <nav className="flex flex-col items-center space-y-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/serveys"
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Surveys
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </NavLink>
              </nav>

              <div className="flex flex-col items-center space-y-4">
                {!isloggedIn ? (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        // Call the logout function here
                        setIsOpen(false);
                        handleLogoutClick();

                      }}
                      className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;