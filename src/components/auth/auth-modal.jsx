import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, Wrench, Shield, Eye, EyeOff } from "lucide-react";

const roleConfig = {
  customer: {
    icon: Car,
    title: "Customer",
    color: "customer"
  },
  manager: {
    icon: Users,
    title: "Manager",
    color: "manager"
  },
  mechanic: {
    icon: Wrench,
    title: "Mechanic",
    color: "mechanic"
  },
  admin: {
    icon: Shield,
    title: "Admin",
    color: "admin"
  }
};

export const AuthModal = ({ isOpen, onClose, onRoleSelect }) => {
  const handleRoleSelect = (role) => {
    onRoleSelect(role);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat text-center">
            Choose Your Role
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
        >
          {Object.entries(roleConfig).map(([role, config]) => {
            const IconComponent = config.icon;
            return (
              <motion.div
                key={role}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-${config.color}`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full bg-${config.color}/10 flex items-center justify-center mb-2`}>
                      <IconComponent className={`h-8 w-8 text-${config.color}`} />
                    </div>
                    <CardTitle className="text-xl font-montserrat">{config.title}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
