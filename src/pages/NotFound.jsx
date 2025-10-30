import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
      <p className="mb-4 text-xl text-muted-foreground">Oops! We couldn't find that page.</p>
      <Link to="/" className="text-primary underline text-lg">Go to Home</Link>
    </div>
  );
};

export default NotFound;
