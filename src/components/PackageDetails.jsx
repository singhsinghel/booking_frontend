import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById, createBooking } from "../api";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfTravelers: 1,
    specialRequests: "",
  });

  useEffect(() => {
    getPackageById(id)
      .then((res) => setPkg(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking({ ...form, packageId: id })
      .then((res) => {
        alert("Booking successful! Invoice: " + res.data.invoice);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  if (!pkg) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{pkg.title}</h1>
      <img
        src={pkg.image}
        alt={pkg.title}
        className="w-full h-64 object-cover my-4"
      />
      <p className="text-gray-700 mb-4">{pkg.description}</p>
      <p className="font-bold text-lg mb-4">Price: ${pkg.price} per person</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="numberOfTravelers"
          placeholder="Number of Travelers"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="specialRequests"
          placeholder="Special Requests (optional)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default PackageDetails;
