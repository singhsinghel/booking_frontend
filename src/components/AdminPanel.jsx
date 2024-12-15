import React, { useState, useEffect } from "react";
import { getPackages, addPackage, updatePackage, deletePackage } from "../api";
import PackageModal from "./Modal"; // A new modal component

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    availableDates: "",
  });

  // Fetch packages on mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await getPackages();
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      if (editMode) {
        // Update existing package
        await updatePackage(editId, {
          ...form,
          availableDates: form.availableDates.split(","),
        });
      } else {
        // Add new package
        await addPackage({
          ...form,
          availableDates: form.availableDates.split(","),
        });
      }
      fetchPackages(); // Refresh the list
      handleModalClose(); // Close modal
    } catch (err) {
      console.error("Error saving package:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePackage(id);
      fetchPackages(); // Refresh the list
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  const handleEdit = (pkg) => {
    setEditMode(true);
    setEditId(pkg._id);
    setForm({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      image: pkg.image,
      availableDates: pkg.availableDates.join(","),
    });
    setIsModalOpen(true); // Open modal for editing
  };

  const handleModalClose = () => {
    setEditMode(false);
    setEditId(null);
    setForm({
      title: "",
      description: "",
      price: "",
      image: "",
      availableDates: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Package
      </button>

      <h2 className="text-xl font-bold mt-8 mb-4">Existing Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{pkg.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{pkg.description}</p>
            <p className="mt-2 font-medium">Price: ${pkg.price}</p>
            <div className="mt-4 flex space-x-2">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => handleEdit(pkg)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(pkg._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/editing packages */}
      {isModalOpen && (
        <PackageModal
          isOpen={isModalOpen}
          form={form}
          setForm={setForm}
          loading={loading}
          editMode={editMode}
          onClose={handleModalClose}
          onSave={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default AdminPanel;
