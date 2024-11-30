import React, { useState } from "react";

export default function SearchComponent() {
  // State for managing the search query
  const [query, setQuery] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search action
  const handleSearch = (e) => {
    e.preventDefault();
    // Example of logging search query
    console.log("Searching for:", query);
    // You can add logic to fetch or filter results based on the query
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        {/* Search Icon */}
        <svg
          className="w-6 h-6 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a7 7 0 11-7 7 7 7 0 017-7zm0 0l7 7"
          />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-md w-full md:w-64"
          placeholder="Search..."
        />

        {/* Search Button (optional if you want a button) */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hidden md:block"
        >
          Search
        </button>
      </form>

      {/* Optional: Show search query as you type */}
      {query && (
        <div className="mt-2 text-sm text-gray-500">
          Searching for: <strong>{query}</strong>
        </div>
      )}
    </div>
  );
}
