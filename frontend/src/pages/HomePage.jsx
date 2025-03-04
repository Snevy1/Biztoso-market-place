
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessageSquare, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-lightBg dark:bg-darkBg transition-colors">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Welcome to Biztoso Marketplace!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          to="/listings"
          className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg hover:shadow-lg transition"
        >
          <ShoppingCart className="w-12 h-12 text-blue-500 mb-4" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Listings Page
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View and manage marketplace listings.
          </p>
        </Link>

        <Link
          to="/chat"
          className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg hover:shadow-lg transition"
        >
          <MessageSquare className="w-12 h-12 text-green-500 mb-4" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Chat Page
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Engage in real-time conversations.
          </p>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg hover:shadow-lg transition"
        >
          <User className="w-12 h-12 text-purple-500 mb-4" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Profile Page
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your profile and settings.
          </p>
        </Link>
      </div>
    </div>
  );
}
