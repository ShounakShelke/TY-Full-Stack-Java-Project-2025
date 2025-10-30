import { useState } from "react";
import { motion } from "framer-motion";
import { X, Wrench, Calendar, Clock, User, MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AssignmentPopup = ({ onClose }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      title: "Engine Oil Change",
      vehicle: "Toyota Camry - MH12 AB 1234",
      customer: "John Doe",
      location: "Mumbai Central",
      priority: "high",
      status: "pending",
      scheduledDate: "2024-01-20",
      scheduledTime: "10:00 AM",
      description: "Complete engine oil change with filter replacement",
      estimatedDuration: "1.5 hours"
    },
    {
      id: 2,
      title: "Brake Pad Replacement",
      vehicle: "Honda Civic - MH14 CD 5678",
      customer: "Sarah Wilson",
      location: "Andheri West",
      priority: "medium",
      status: "in_progress",
      scheduledDate: "2024-01-20",
      scheduledTime: "2:00 PM",
      description: "Replace front brake pads and check brake fluid",
      estimatedDuration: "2 hours"
    },
    {
      id: 3,
      title: "Tire Rotation & Alignment",
      vehicle: "Ford EcoSport - MH01 EF 9012",
      customer: "Mike Johnson",
      location: "Bandra East",
      priority: "low",
      status: "pending",
      scheduledDate: "2024-01-21",
      scheduledTime: "11:00 AM",
      description: "Rotate tires and perform wheel alignment",
      estimatedDuration: "1 hour"
    }
  ];

  const handleAcceptAssignment = (assignmentId) => {
    // Handle assignment acceptance
    console.log(`Accepted assignment ${assignmentId}`);
    setSelectedAssignment(null);
  };

  const handleDeclineAssignment = (assignmentId) => {
    // Handle assignment decline
    console.log(`Declined assignment ${assignmentId}`);
    setSelectedAssignment(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-blue-500";
      case "in_progress": return "bg-orange-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-montserrat font-bold text-foreground">
            Service Assignments
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
            {assignments.map((assignment) => (
              <motion.div
                key={assignment.id}
                whileHover={{ scale: 1.01 }}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{assignment.title}</h3>
                      <div className="flex gap-2">
                        <Badge
                          className={`text-white ${getPriorityColor(assignment.priority)}`}
                        >
                          {assignment.priority}
                        </Badge>
                        <Badge
                          className={`text-white ${getStatusColor(assignment.status)}`}
                        >
                          {assignment.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Wrench className="h-4 w-4 text-mechanic" />
                          <span className="font-medium">{assignment.vehicle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.customer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.location}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.scheduledDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.scheduledTime} ({assignment.estimatedDuration})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {assignment.description}
                    </p>

                    {assignment.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-mechanic hover:bg-mechanic/90"
                          onClick={() => handleAcceptAssignment(assignment.id)}
                        >
                          Accept Assignment
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeclineAssignment(assignment.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                    {assignment.status === "in_progress" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          Update Progress
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {assignments.length === 0 && (
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No assignments available at the moment.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssignmentPopup;
