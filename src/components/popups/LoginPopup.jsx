import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const demoUsers = [
  { email: "customer@example.com", password: "password1", role: "customer" },
  { email: "manager@example.com", password: "password2", role: "manager" },
  { email: "mechanic@example.com", password: "password3", role: "mechanic" },
  { email: "admin@example.com", password: "password4", role: "admin" }
];

const LoginPopup = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setError("");
      onLogin(user);
      onClose();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="login-email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="login-password"
          />
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline" data-testid="login-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} data-testid="login-submit">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
