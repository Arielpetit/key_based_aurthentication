import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpWithKeyManagement } from "../services/registerService";

const RegisterPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing the popup
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!phoneNumber) {
      setMessage("Phone number is required!");
      return;
    }

    setLoading(true);
    try {
        // Generate the key pair
      await sendOtpWithKeyManagement(phoneNumber);
      console.log("Successfully registered:", phoneNumber);

      // If successful, show success message and popup
      setMessage("Registration successful!");
      setShowSuccessPopup(true); // Show the success popup

      // After 2 seconds, navigate to /cart
      setTimeout(() => {
        navigate("/welcome");
      }, 2000); // Delay for 2 seconds before navigating
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h1>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRegister}
          className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center text-green-600">
              Registration Successful!
            </h2>
            <p className="text-center mt-4">You will be redirected to the cart page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;