import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { AuthModal } from "@/components/auth/auth-modal.jsx";
import RoleSelectionPopup from "@/components/popups/RoleSelectionPopup";
import LoginPopup from "@/components/popups/LoginPopup";
import SignupPopup from "@/components/popups/SignupPopup";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRoleSelectionOpen, setIsRoleSelectionOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { login, register, logout, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize GSAP animations on component mount
  useEffect(() => {
    import("gsap").then((gsap) => {
      gsap.default.fromTo(
        ".animate-fade-in",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    });
  }, []);

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = () => {
    setIsRoleSelectionOpen(true);
  };

  const handleSignup = () => {
    setIsRoleSelectionOpen(true);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsRoleSelectionOpen(false);
    setIsLoginPopupOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
    toast({
      title: "Welcome to CarCircle!",
      description: "You've successfully logged in.",
    });
    // Navigation will happen via AuthContext
  };

  const handleSignupSuccess = () => {
    setIsSignupPopupOpen(false);
    toast({
      title: "Welcome to CarCircle!",
      description: "Account created successfully.",
    });
    // Navigation will happen via AuthContext
  };

  const handleSwitchToSignup = () => {
    setIsLoginPopupOpen(false);
    setIsSignupPopupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupPopupOpen(false);
    setIsLoginPopupOpen(true);
  };

  // If user is logged in, don't render landing page
  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={handleLogin} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="animate-fade-in"
      >
        <HeroSection onGetStartedClick={handleLogin} />

        {/* Car Search Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-montserrat font-bold text-foreground mb-4">
                Find Your Perfect Car
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Search from thousands of cars available for rent or purchase
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-card p-8 rounded-2xl shadow-lg mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <select className="w-full p-3 border rounded-lg bg-background">
                    <option>Select City</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Pune</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Car Type</label>
                  <select className="w-full p-3 border rounded-lg bg-background">
                    <option>Any Type</option>
                    <option>Hatchback</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Luxury</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Range</label>
                  <select className="w-full p-3 border rounded-lg bg-background">
                    <option>Any Budget</option>
                    <option>Under ₹2,000/day</option>
                    <option>₹2,000 - ₹5,000/day</option>
                    <option>Above ₹5,000/day</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Search Cars
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Featured Cars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Maruti Swift",
                  image: "/placeholder.svg",
                  price: "₹2,500/day",
                  location: "Mumbai",
                  rating: 4.5,
                  type: "Hatchback"
                },
                {
                  name: "Honda City",
                  image: "/placeholder.svg",
                  price: "₹3,200/day",
                  location: "Delhi",
                  rating: 4.7,
                  type: "Sedan"
                },
                {
                  name: "Hyundai Creta",
                  image: "/placeholder.svg",
                  price: "₹4,800/day",
                  location: "Bangalore",
                  rating: 4.6,
                  type: "SUV"
                }
              ].map((car, index) => (
                <motion.div
                  key={car.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{car.name}</h3>
                      <span className="text-primary font-bold">{car.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-3">{car.type} • {car.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">&#9733;</span>
                        <span className="text-sm">{car.rating}</span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-montserrat font-bold text-white mb-6">
                Ready to Transform Your Car Rental Experience?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust CarCircle for their car rental needs
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
              </motion.button>
            </motion.div>
          </div>
        </section>
      </motion.main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRoleSelect={handleRoleSelect}
      />

      <RoleSelectionPopup
        isOpen={isRoleSelectionOpen}
        onClose={() => setIsRoleSelectionOpen(false)}
        onSelectRole={handleRoleSelect}
      />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onLogin={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />

      <SignupPopup
        isOpen={isSignupPopupOpen}
        onClose={() => setIsSignupPopupOpen(false)}
        onSignup={handleSignupSuccess}
        onSwitchToLogin={handleSwitchToLogin}
        selectedRole={selectedRole}
      />
    </div>
  );
};

export default Index;
