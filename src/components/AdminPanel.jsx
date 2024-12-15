import React, { useState, useEffect } from "react";
import { getPackages, addPackage, updatePackage, deletePackage } from "../api";

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    availableDates: "",
  });

  useEffect(() => {
    getPackages()
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addPackage(form)
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
    setLoading(false);
  };

  const handleDelete = (id) =>
    deletePackage(id)
      .then(() => window.location.reload())
      .catch((err) => console.error(err));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Package Title"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <input
          type="text"
          name="availableDates"
          placeholder="Available Dates (comma-separated)"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, availableDates: e.target.value.split(",") })
          }
          required
        />
        <button
          type="submit"
          className={`w-full flex items-center justify-center px-4 py-2 text-white font-medium rounded-md ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Existing Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{pkg.title}</h3>
            <button
              onClick={() => handleDelete(pkg._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
