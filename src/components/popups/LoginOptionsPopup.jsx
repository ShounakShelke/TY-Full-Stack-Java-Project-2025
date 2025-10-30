import React, { useState } from "react";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import { Button } from "@/components/ui/button";

const LoginOptionsPopup = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  if (!isOpen) return null;

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <>
      {!selectedRole ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4">Select User Role</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={() => handleRoleSelect("customer")}>Customer</Button>
              <Button onClick={() => handleRoleSelect("manager")}>Manager</Button>
              <Button onClick={() => handleRoleSelect("mechanic")}>Mechanic</Button>
              <Button onClick={() => handleRoleSelect("admin")}>Admin</Button>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              Please select your role to proceed to login or signup.
            </div>
          </div>
        </div>
      ) : (
        <>
          <Button
            variant="outline"
            className="fixed top-4 left-4 z-60"
            onClick={handleBack}
          >
            Back
          </Button>
          <LoginPopup
            isOpen={true}
            onClose={onClose}
            onLogin={onLogin}
            role={selectedRole}
          />
          <SignupPopup
            isOpen={true}
            onClose={onClose}
            onSignup={onSignup}
            role={selectedRole}
          />
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-60 bg-white p-4 rounded shadow-md text-center text-sm">
            <div>Demo Credentials:</div>
            {selectedRole === "customer" && (
              <div>Email: customer@example.com | Password: password1</div>
            )}
            {selectedRole === "manager" && (
              <div>Email: manager@example.com | Password: password2</div>
            )}
            {selectedRole === "mechanic" && (
              <div>Email: mechanic@example.com | Password: password3</div>
            )}
            {selectedRole === "admin" && (
              <div>Email: admin@example.com | Password: password4</div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LoginOptionsPopup;
