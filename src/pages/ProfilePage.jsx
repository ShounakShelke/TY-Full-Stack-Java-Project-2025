import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Edit3, Camera, Shield, Star, Car, Trophy, Mail, Phone, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getProfile, updateProfile } from "../api/profile";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    // On login or mount, try to sync profile with backend
    fetchProfile();
    // For DEMO ONLY: set backend profile on login, to match user
    if (user) {
      fetch("/api/user/setProfile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) })
    }
    // eslint-disable-next-line
  }, [user]);

  async function fetchProfile() {
    setLoading(true);
    setErr("");
    try {
      const profile = await getProfile();
      setProfileData(profile);
    } catch (e) {
      setErr((e && e.message) || "Could not fetch profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setLoading(true);
    setErr("");
    try {
      await updateProfile(profileData);
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
      setIsEditing(false);
    } catch (e) {
      setErr((e && e.message) || "Could not update profile");
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (err || !profileData) return <div className="p-8 text-center text-red-600">{err || "Profile not found"}</div>;

  // Simple role-based stats (demo)
  const userRole = profileData.role || "customer";
  const stats = userRole === "customer" ? [
    { label: "Bookings", value: "15", icon: Car },
    { label: "Rating", value: "4.8", icon: Star },
    { label: "Reviews", value: "12", icon: Trophy },
    { label: "Verified", value: "Yes", icon: Shield }
  ] : userRole === "manager" ? [
    { label: "Fleet Size", value: "24", icon: Car },
    { label: "Revenue", value: "₹1.85L", icon: Trophy },
    { label: "Rating", value: "4.8", icon: Star },
    { label: "Verified", value: "Yes", icon: Shield }
  ] : userRole === "mechanic" ? [
    { label: "Jobs Done", value: "156", icon: Car },
    { label: "Rating", value: "4.9", icon: Star },
    { label: "Experience", value: "3 yrs", icon: Trophy },
    { label: "Verified", value: "Yes", icon: Shield }
  ] : [
    { label: "Users", value: "2,847", icon: Car },
    { label: "Reports", value: "89", icon: Trophy },
    { label: "Uptime", value: "99.9%", icon: Star },
    { label: "Verified", value: "Yes", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
              <h1 className="text-4xl font-montserrat font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your account information and preferences</p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="relative inline-block mb-4">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name || profileData.username} />
                            <AvatarFallback className="text-2xl">
                              {(profileData.name || profileData.username || 'U').split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                        <h2 className="text-xl font-semibold mb-1">{profileData.name || profileData.username}</h2>
                        <p className="text-muted-foreground mb-4">{profileData.email}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{profileData.location || "-"}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Member since {profileData.joinDate || "2023"}</span>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                              <div key={stat.label} className="text-center">
                                <IconComponent className="h-5 w-5 mx-auto text-primary mb-1" />
                                <div className="font-semibold">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              {/* Profile Details */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Personal Information</CardTitle>
                          <CardDescription>Update your personal details and preferences</CardDescription>
                        </div>
                        <Button
                          variant={isEditing ? "default" : "outline"}
                          onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                          {isEditing ? "Save Changes" : (<><Edit3 className="h-4 w-4 mr-2" />Edit</>)}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="name"
                              value={profileData.name || ""}
                              onChange={e => handleInputChange("name", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email || ""}
                              onChange={e => handleInputChange("email", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              value={profileData.phone || ""}
                              onChange={e => handleInputChange("phone", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="location"
                              value={profileData.location || ""}
                              onChange={e => handleInputChange("location", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio || ""}
                          onChange={e => handleInputChange("bio", e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <Separator />
                      {/* Account Status */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Account Status</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" /> Verified Account
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800"> Email Verified </Badge>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800"> Phone Verified </Badge>
                        </div>
                      </div>
                      <Separator />
                      {/* Danger Zone */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
                        <div className="flex gap-4">
                          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"> Change Password </Button>
                          <Button variant="destructive"> Delete Account </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
