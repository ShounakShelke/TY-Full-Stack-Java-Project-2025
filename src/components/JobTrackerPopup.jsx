import { useState } from "react";
import { motion } from "framer-motion";
import { X, Clock, Play, Pause, Square, CheckCircle, AlertCircle, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const JobTrackerPopup = ({ onClose }) => {
  const [activeTimers, setActiveTimers] = useState(new Set());
  const [jobStatuses, setJobStatuses] = useState({});

  const jobs = [
    {
      id: 1,
      title: "Engine Oil Change",
      vehicle: "Toyota Camry - MH12 AB 1234",
      customer: "John Doe",
      status: "in_progress",
      progress: 65,
      estimatedTime: "1.5 hours",
      timeSpent: "58 min",
      startTime: "2024-01-20T10:00:00",
      tasks: [
        { id: 1, name: "Drain old oil", completed: true },
        { id: 2, name: "Replace oil filter", completed: true },
        { id: 3, name: "Add new oil", completed: false },
        { id: 4, name: "Check oil level", completed: false },
        { id: 5, name: "Final inspection", completed: false }
      ]
    },
    {
      id: 2,
      title: "Brake Pad Replacement",
      vehicle: "Honda Civic - MH14 CD 5678",
      customer: "Sarah Wilson",
      status: "paused",
      progress: 30,
      estimatedTime: "2 hours",
      timeSpent: "45 min",
      startTime: "2024-01-20T14:00:00",
      tasks: [
        { id: 1, name: "Inspect brake pads", completed: true },
        { id: 2, name: "Remove wheels", completed: true },
        { id: 3, name: "Replace brake pads", completed: false },
        { id: 4, name: "Reassemble wheels", completed: false },
        { id: 5, name: "Test brakes", completed: false }
      ]
    },
    {
      id: 3,
      title: "Tire Rotation & Alignment",
      vehicle: "Ford EcoSport - MH01 EF 9012",
      customer: "Mike Johnson",
      status: "pending",
      progress: 0,
      estimatedTime: "1 hour",
      timeSpent: "0 min",
      startTime: null,
      tasks: [
        { id: 1, name: "Jack up vehicle", completed: false },
        { id: 2, name: "Rotate tires", completed: false },
        { id: 3, name: "Check alignment", completed: false },
        { id: 4, name: "Lower vehicle", completed: false },
        { id: 5, name: "Final check", completed: false }
      ]
    }
  ];

  const handleStartJob = (jobId) => {
    setActiveTimers(prev => new Set([...prev, jobId]));
    setJobStatuses(prev => ({
      ...prev,
      [jobId]: "in_progress"
    }));
  };

  const handlePauseJob = (jobId) => {
    setActiveTimers(prev => {
      const newSet = new Set(prev);
      newSet.delete(jobId);
      return newSet;
    });
    setJobStatuses(prev => ({
      ...prev,
      [jobId]: "paused"
    }));
  };

  const handleCompleteJob = (jobId) => {
    setActiveTimers(prev => {
      const newSet = new Set(prev);
      newSet.delete(jobId);
      return newSet;
    });
    setJobStatuses(prev => ({
      ...prev,
      [jobId]: "completed"
    }));
  };

  const handleTaskToggle = (jobId, taskId) => {
    // Handle task completion toggle
    console.log(`Toggled task ${taskId} for job ${jobId}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "in_progress": return <Play className="h-4 w-4 text-green-500" />;
      case "paused": return <Pause className="h-4 w-4 text-yellow-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in_progress": return "bg-green-500";
      case "paused": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      case "pending": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-card rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-montserrat font-bold text-foreground">
            Job Tracker
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
          <div className="grid grid-cols-1 gap-6 max-h-96 overflow-y-auto">
            {jobs.map((job) => {
              const currentStatus = jobStatuses[job.id] || job.status;
              const isActive = activeTimers.has(job.id);

              return (
                <motion.div
                  key={job.id}
                  whileHover={{ scale: 1.01 }}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <div className="bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(currentStatus)}
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.vehicle}</p>
                          <p className="text-sm text-muted-foreground">{job.customer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <Timer className="h-4 w-4" />
                            <span>{job.timeSpent} / {job.estimatedTime}</span>
                          </div>
                          <Badge
                            className={`text-white ${getStatusColor(currentStatus)} mt-1`}
                          >
                            {currentStatus.replace('_', ' ')}
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          {currentStatus === "pending" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStartJob(job.id)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </Button>
                          )}

                          {currentStatus === "in_progress" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handlePauseJob(job.id)}
                              >
                                <Pause className="h-4 w-4 mr-1" />
                                Pause
                              </Button>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => handleCompleteJob(job.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                            </>
                          )}

                          {currentStatus === "paused" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStartJob(job.id)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Resume
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium mb-3">Tasks</h4>
                    <div className="space-y-2">
                      {job.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer"
                          onClick={() => handleTaskToggle(job.id, task.id)}
                        >
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            task.completed
                              ? 'bg-mechanic border-mechanic'
                              : 'border-muted-foreground'
                          }`}>
                            {task.completed && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            task.completed ? 'line-through text-muted-foreground' : ''
                          }`}>
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-8">
              <Timer className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active jobs at the moment.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {activeTimers.size} active timer{activeTimers.size !== 1 ? 's' : ''}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default JobTrackerPopup;
