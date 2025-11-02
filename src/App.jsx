import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CarsPage from "./pages/CarsPage";
import SellPage from "./pages/SellPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import { ManagerDashboard } from "./pages/dashboards/ManagerDashboard";
import { MechanicDashboard } from "./pages/dashboards/MechanicDashboard";
import { CustomerDashboard } from "./pages/dashboards/CustomerDashboard";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/booking/:id" element={
              <ProtectedRoute roles={["customer"]}>
                <BookingDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager"
              element={
                <ProtectedRoute roles={["manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mechanic"
              element={
                <ProtectedRoute roles={["mechanic"]}>
                  <MechanicDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
