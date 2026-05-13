import React, { useEffect, useState } from "react";
import { MdLogout, MdDashboard, MdHome, MdCreate, MdQuestionAnswer, MdAnalytics } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logging out...", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Failed to logout");
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/api/v1/profile/dashboard", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data && data.data && data.data.name) {
          setUser(data.data.name);
        } else {
          throw new Error("Invalid user data format");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (loading) {
    return (
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#1a1f2b] flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-400">Loading...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#1a1f2b] flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdLogout className="text-2xl text-red-500" />
          </div>
          <p className="text-red-500 mb-4">Error loading user data</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-[#1a1f2b] ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      } transition-all duration-300 flex flex-col shadow-xl z-50`}
    >
      {/* Header Section */}
      <div className="flex-shrink-0 py-4 px-4">
        <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
          {!isCollapsed && (
            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Admin Panel
              </h2>
              <p className="text-sm text-gray-400 mt-1">Welcome, {user}</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${
              isCollapsed ? 'mx-auto' : 'ml-4'
            } p-2 rounded-lg hover:bg-gray-700/50 transition duration-300`}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-1">
          <Link
            to="/"
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-3' : 'px-6'
            } py-3 transition duration-300 ${
              isActive("/")
                ? "text-blue-500 bg-blue-500/10"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-100"
            }`}
          >
            <MdHome className="text-2xl flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Home</span>}
          </Link>

          <Link
            to="/dashboard"
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-3' : 'px-6'
            } py-3 transition duration-300 ${
              isActive("/dashboard")
                ? "text-blue-500 bg-blue-500/10"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-100"
            }`}
          >
            <MdDashboard className="text-2xl flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </Link>

          <Link
            to="/dashboard/create"
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-3' : 'px-6'
            } py-3 transition duration-300 ${
              isActive("/dashboard/create")
                ? "text-blue-500 bg-blue-500/10"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-100"
            }`}
          >
            <MdCreate className="text-2xl flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Create Survey</span>}
          </Link>

          <Link
            to="/dashboard/add-question"
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-3' : 'px-6'
            } py-3 transition duration-300 ${
              isActive("/dashboard/add-question")
                ? "text-blue-500 bg-blue-500/10"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-100"
            }`}
          >
            <MdQuestionAnswer className="text-2xl flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Questions</span>}
          </Link>

          <Link
            to="/dashboard/response"
            className={`flex items-center ${
              isCollapsed ? 'justify-center px-3' : 'px-6'
            } py-3 transition duration-300 ${
              isActive("/dashboard/response")
                ? "text-blue-500 bg-blue-500/10"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-100"
            }`}
          >
            <MdAnalytics className="text-2xl flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Responses</span>}
          </Link>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="flex-shrink-0 py-4 px-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center' : 'px-4'
          } py-3 transition duration-300 rounded-lg text-red-500 hover:bg-red-500/10`}
        >
          <MdLogout className="text-2xl flex-shrink-0" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;