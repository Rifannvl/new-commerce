import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState(""); // State to store the username
  const [password, setPassword] = useState(""); // State to store the password
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/home");
    }
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setError("");

    try {
      // Send POST request to API
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // Use the input value for username
          password: password, // Use the input value for password
          expiresInMins: 30, // Optional, defaults to 60
        }),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If login successful, save the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Redirect to the "product" page (or home page)
        navigate("/home");
      } else {
        // If login failed, show an error message
        setError("Login failed: " + data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/black-laptop-screen-dark-room-night_169016-58233.jpg?ga=GA1.1.1605900882.1733074474&semt=ais_hybrid')",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-transparent border border-gray-200 p-8 rounded-lg shadow-xl backdrop-blur-sm w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        {/* Error message display */}
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-100"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
