import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

try {
  createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
} catch (error) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `<pre style="color: red;">Error: ${error.message}\n${error.stack}</pre>`;
  } else {
    console.error("Root element not found:", error);
  }
}
