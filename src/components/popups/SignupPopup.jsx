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

  const handleSubmit = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const res = await register({ email, username, password, role });
    if (res.error) {
      setError(res.error);
    } else {
      // Auto-login after successful registration
      const loginRes = await login({ email, password });
      if (loginRes.error) {
        setError("Registration successful but login failed. Please try logging in manually.");
      } else {
        onClose();
      }
    }
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
