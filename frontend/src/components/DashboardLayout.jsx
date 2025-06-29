import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 p-8 xl:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 