import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "../../context/AuthContext";

const SignupPopup = ({ isOpen, onClose, selectedRole, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(selectedRole || "customer");
  const [error, setError] = useState("");
  const { register, login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await register({ email, username, password, role });
      if (res.error) {
        setError(res.error);
      } else {
        // Show success message
        alert("Registration successful! Please login with your credentials.");
        // Reset form
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        // Close signup and switch to login
        onClose();
        if (onSwitchToLogin) {
          onSwitchToLogin();
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
          <label className="block mb-1">Username</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="signup-username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="mechanic">Mechanic</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
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
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} variant="outline" data-testid="signup-cancel">
            Cancel
          </Button>
          <Button type="submit" data-testid="signup-submit">
            Sign Up
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
