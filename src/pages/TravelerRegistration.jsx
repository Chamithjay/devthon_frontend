import { useState } from "react";
import axios from "axios";

export default function TravelerRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "traveler",
    avatar: "",
    favoriteFoods: "",
    favoritePlaces: "",
    reviews: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      favoriteFoods: formData.favoriteFoods
        ? formData.favoriteFoods.split(",").map((id) => id.trim())
        : [],
      favoritePlaces: formData.favoritePlaces
        ? formData.favoritePlaces.split(",").map((id) => id.trim())
        : [],
      reviews: formData.reviews
        ? formData.reviews.split(",").map((id) => id.trim())
        : [],
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/register/traveler",
        payload
      );
      setSuccess(`Registered successfully as ${response.data.name}`);
      setError(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "traveler",
        avatar: "",
        favoriteFoods: "",
        favoritePlaces: "",
        reviews: "",
      });
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
        Traveler Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Avatar URL", name: "avatar", type: "url" },
          {
            label: "Favorite Foods (comma-separated ObjectIds)",
            name: "favoriteFoods",
            type: "text",
          },
          {
            label: "Favorite Places (comma-separated ObjectIds)",
            name: "favoritePlaces",
            type: "text",
          },
          {
            label: "Reviews (comma-separated ObjectIds)",
            name: "reviews",
            type: "text",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={["name", "email", "password"].includes(field.name)}
            />
          </div>
        ))}

        <input type="hidden" name="role" value="traveler" />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Register Traveler
        </button>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mt-2">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm mt-2">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
