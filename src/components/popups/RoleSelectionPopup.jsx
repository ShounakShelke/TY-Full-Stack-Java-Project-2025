import React from "react";
import { motion } from "framer-motion";

const roles = [
  {
    key: "customer",
    title: "Customer",
    description: "Book and manage your car rentals",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-customer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h1l1 2h12l1-2h1" />
        <circle cx="7" cy="16" r="2" />
        <circle cx="17" cy="16" r="2" />
      </svg>
    )
  },
  {
    key: "manager",
    title: "Manager",
    description: "Manage your vehicle fleet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-manager"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14v7" />
      </svg>
    )
  },
  {
    key: "mechanic",
    title: "Mechanic",
    description: "Handle vehicle maintenance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-mechanic"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l3 3m0 0l3-3m-3 3V7" />
      </svg>
    )
  },
  {
    key: "admin",
    title: "Admin",
    description: "System administration",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-admin"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  }
];

const RoleSelectionPopup = ({ isOpen, onClose, onSelectRole }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Choose Your Role</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {roles.map(({ key, title, description, icon }) => (
            <button
              key={key}
              onClick={() => onSelectRole(key)}
              className="flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-lg transition"
            >
              {icon}
              <span className="mt-2 font-semibold">{title}</span>
              <span className="text-sm text-gray-500">{description}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelectionPopup;
