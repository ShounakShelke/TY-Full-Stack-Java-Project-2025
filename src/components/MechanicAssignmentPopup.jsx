import React from 'react';
import { motion } from 'framer-motion';
import { X, Wrench, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MechanicAssignmentPopup = ({ onClose }) => {
  const assignments = [
    {
      id: 1,
      vehicle: "BMW X3 - MH01AB1234",
      issue: "Brake pad replacement",
      priority: "High",
      assignedDate: "2024-01-15",
      deadline: "2024-01-16",
      status: "In Progress"
    },
    {
      id: 2,
      vehicle: "Honda City - MH02CD5678",
      issue: "Oil change & filter replacement",
      priority: "Medium",
      assignedDate: "2024-01-14",
      deadline: "2024-01-17",
      status: "Pending"
    },
    {
      id: 3,
      vehicle: "Maruti Swift - MH03EF9012",
      issue: "Pre-rental inspection",
      priority: "Low",
      assignedDate: "2024-01-16",
      deadline: "2024-01-18",
      status: "Pending"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              All Assignments
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{assignment.vehicle}</h4>
                    <p className="text-sm text-gray-600 mt-1">{assignment.issue}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={assignment.priority === "High" ? "destructive" : assignment.priority === "Medium" ? "secondary" : "outline"}>
                      {assignment.priority}
                    </Badge>
                    <Badge variant={assignment.status === "In Progress" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Assigned: {assignment.assignedDate}
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Due: {assignment.deadline}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  {assignment.status === "Pending" && (
                    <Button size="sm">
                      Start Work
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MechanicAssignmentPopup;
