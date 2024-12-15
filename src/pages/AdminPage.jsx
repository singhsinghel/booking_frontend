import React from "react";
import AdminPanel from "../components/AdminPanel";

const AdminPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <AdminPanel />
    </div>
  );
};

export default AdminPage;
