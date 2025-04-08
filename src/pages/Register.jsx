import { useNavigate } from "react-router-dom";

export default function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Choose Registration Type
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/register/vendor")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-200"
          >
            Register as Vendor
          </button>

          <button
            onClick={() => navigate("/register/traveler")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-200"
          >
            Register as Traveler
          </button>
        </div>
      </div>
    </div>
  );
}
