import React, { useEffect, useState } from "react";
import { getPackages } from "../api";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages()
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <div className="heading flex  items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Available Tour Packages</h1>

        <button className="text-lg font-semibold border-2 p-1 rounded-md">
          <Link to="/admin">Admin</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{pkg.title}</h2>
              <p className="text-gray-700">{pkg.description}</p>
              <p className="font-bold text-lg mt-2">Price: ${pkg.price}</p>
              <Link
                to={`/package/${pkg._id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
