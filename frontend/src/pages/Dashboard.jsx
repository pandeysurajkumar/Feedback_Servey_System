import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 transition-all duration-300">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;