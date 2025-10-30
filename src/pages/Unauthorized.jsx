import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Not Authorized</h1>
      <p className="mb-6 text-lg">You do not have permission to access this page.</p>
      <Link to="/" className="text-primary underline text-lg">Go to Home</Link>
    </div>
  );
}
