import { useState } from "react";
import axios from "axios";

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "vendor",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    mobile: "",
    openingHours: "",
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      coordinates: {
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      },
      images: [], // You can later upload and add image URLs here
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/register/vendor",
        payload
      );
      setSuccess(`Registered successfully as ${response.data.name}`);
      setError(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "vendor",
        description: "",
        location: "",
        latitude: "",
        longitude: "",
        mobile: "",
        openingHours: "",
      });
      setImages([]);
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        const messages = detail.map((d) => d.msg).join(" | ");
        setError(messages);
      } else if (typeof detail === "string") {
        setError(detail);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Vendor Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Description", name: "description", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Latitude", name: "latitude", type: "number", step: "any" },
          {
            label: "Longitude",
            name: "longitude",
            type: "number",
            step: "any",
          },
          { label: "Mobile", name: "mobile", type: "text" },
          { label: "Opening Hours", name: "openingHours", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              step={field.step}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData[field.name]}
              onChange={handleChange}
              required={["name", "email", "password"].includes(field.name)}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>

        <input type="hidden" name="role" value="vendor" />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Register Vendor
        </button>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
