import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/user/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }), // 👈 added names
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/userPage");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen font-inter text-gray-200"
      style={{ backgroundColor: "#0b0f2a" }}
    >
      <div className="relative w-full max-w-md mx-auto p-8 md:p-12 bg-gray-900 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full mb-4 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mb-6 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition"
          >
            Sign up
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;

