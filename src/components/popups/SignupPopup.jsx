import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const demoUsers = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" }
];

const SignupPopup = ({ isOpen, onClose, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (demoUsers.find((u) => u.email === email)) {
      setError("Email already registered");
      return;
    }
    setError("");
    onSignup({ email, password });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="signup-email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="signup-password"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            data-testid="signup-confirm-password"
          />
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline" data-testid="signup-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} data-testid="signup-submit">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
