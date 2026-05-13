import React, { useEffect, useState } from "react";
import useri from "../assets/user.svg";
import { MdEdit, MdLock, MdEmail, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { LiaLinkedinIn } from "react-icons/lia";

function User() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
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
        const data = await response.json();
        
        if (response.ok) {
          setUser(data.data.name);
          setEmail(data.data.email);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdPerson className="text-3xl text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-auto bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img
                  src={useri}
                  alt="User"
                  className="w-32 h-32 rounded-full border-4 border-white bg-white p-1"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition duration-300 transform hover:scale-110">
                  <MdEdit className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user}</h1>
            <div className="flex items-center justify-center text-gray-600 mb-8">
              <MdEmail className="text-xl mr-2" />
              <span>{email}</span>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-500">12</div>
                <div className="text-sm text-gray-600">Surveys Created</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-500">48</div>
                <div className="text-sm text-gray-600">Responses</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-green-500">85%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 shadow-md">
                <MdEdit className="mr-2 text-xl" />
                Edit Profile
              </button>
              <Link  to={"/change-password"} className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-md">
                <MdLock className="mr-2 text-xl" />
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;