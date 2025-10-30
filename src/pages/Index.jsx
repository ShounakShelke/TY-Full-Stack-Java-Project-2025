import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { AuthModal } from "@/components/auth/auth-modal.jsx";
import { CustomerDashboard } from "./dashboards/CustomerDashboard";
import { ManagerDashboard } from "./dashboards/ManagerDashboard";
import { MechanicDashboard } from "./dashboards/MechanicDashboard";
import { AdminDashboard } from "./dashboards/AdminDashboard";
import RoleSelectionPopup from "@/components/popups/RoleSelectionPopup";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isRoleSelectionOpen, setIsRoleSelectionOpen] = useState(false);
  const { toast } = useToast();

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

  const handleLogin = () => {
    setIsRoleSelectionOpen(true);
  };

  const handleSignup = () => {
    setIsRoleSelectionOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user.role);
    toast({
      title: "Welcome to CarCircle!",
      description: `You've successfully logged in as ${user.email} (${user.role}).`,
    });
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser("customer"); // For demo, set to customer
    toast({
      title: "Welcome to CarCircle!",
      description: `Account created successfully for ${user.email}.`,
    });
  };

  const handleRoleSelect = (role) => {
    setCurrentUser(role);
    toast({
      title: "Welcome to CarCircle!",
      description: `You've successfully logged in as a ${role}.`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (currentUser) {
      case "customer":
        return <CustomerDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "mechanic":
        return <MechanicDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return null;
    }
  };

  // If user is logged in, show dashboard
  if (currentUser) {
    return (
      <div className="min-h-screen">
        {/* Navigation bar for logged-in users */}
        <div className="fixed top-4 right-4 z-50">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {renderDashboard()}
          </motion.div>
        </AnimatePresence>
      </div>
    );
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
        onSelectRole={(role) => {
          setIsRoleSelectionOpen(false);
          setCurrentUser(role);
          toast({
            title: "Welcome to CarCircle!",
            description: `You've successfully logged in as a ${role}.`,
          });
        }}
      />
    </div>
  );
};

export default Index;
