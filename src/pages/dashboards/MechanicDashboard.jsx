import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Calendar, CheckCircle, AlertTriangle, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JobTrackerPopup } from "@/components/popups/JobTrackerPopup";
import { AlertPopup } from "@/components/popups/AlertPopup";

export const MechanicDashboard = () => {
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [showServiceReportPopup, setShowServiceReportPopup] = useState(false);
  const [showJobTrackerPopup, setShowJobTrackerPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  // Track timers for each job by job id
  const [jobTimers, setJobTimers] = useState({});

  useEffect(() => {
    // Set up intervals for active timers
    const activeJobIds = Object.keys(jobTimers).filter(
      (jobId) => jobTimers[jobId].isRunning
    );

    if (activeJobIds.length === 0) return;

    const interval = setInterval(() => {
      setJobTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        activeJobIds.forEach((jobId) => {
          updatedTimers[jobId].seconds += 1;
        });
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [jobTimers]);

  // Start timer for a job
  const startTimer = (jobId) => {
    setJobTimers((prev) => ({
      ...prev,
      [jobId]: { seconds: prev[jobId]?.seconds || 0, isRunning: true, isDone: false },
    }));
  };

  // Stop timer for a job
  const stopTimer = (jobId) => {
    setJobTimers((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], isRunning: false },
    }));
  };

  // Reset timer for a job
  const resetTimer = (jobId) => {
    setJobTimers((prev) => ({
      ...prev,
      [jobId]: { seconds: 0, isRunning: false, isDone: false },
    }));
  };

  // Mark job as done
  const markDone = (jobId) => {
    setJobTimers((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], isDone: true, isRunning: false },
    }));
  };

  const stats = [
    { label: "Assigned Vehicles", value: "12", icon: Wrench, color: "mechanic" },
    { label: "Pending Jobs", value: "5", icon: Clock, color: "orange-500" },
    { label: "Completed Today", value: "3", icon: CheckCircle, color: "green-500" },
    { label: "Urgent Alerts", value: "2", icon: AlertTriangle, color: "red-500" },
  ];

  const urgentJobs = [
    {
      id: 1,
      vehicle: "BMW X3 - MH01AB1234",
      issue: "Brake pad replacement",
      priority: "High",
      assignedDate: "2024-01-15",
      deadline: "2024-01-16"
    },
    {
      id: 2,
      vehicle: "Honda City - MH02CD5678",
      issue: "Oil change & filter replacement",
      priority: "Medium",
      assignedDate: "2024-01-14",
      deadline: "2024-01-17"
    },
  ];

  const todaySchedule = [
    { time: "09:00", task: "Inspect BMW X3 brakes", status: "completed" },
    { time: "10:30", task: "Oil change for Honda City", status: "in-progress" },
    { time: "14:00", task: "Pre-rental inspection - Maruti Swift", status: "pending" },
    { time: "16:00", task: "Document service report", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background theme-mechanic">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-foreground">
              Service Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track maintenance jobs and vehicle status
            </p>
          </div>
          <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowServiceReportPopup(true)}>
              <FileText className="h-4 w-4 mr-2" />
              Upload Report
            </Button>
            <Button className="bg-mechanic hover:bg-mechanic/90" onClick={() => {
              alert("Marked as complete");
            }}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="p-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <IconComponent className={`h-4 w-4 text-${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Urgent Jobs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Urgent Maintenance Jobs
                </CardTitle>
                <CardDescription>
                  High priority tasks requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {urgentJobs.map((job) => {
                  const jobTimer = jobTimers[job.id] || { seconds: 0, isRunning: false, isDone: false };
                  const formatTime = (seconds) => {
                    const mins = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    return `${mins}:${secs.toString().padStart(2, '0')}`;
                  };

                  return (
                    <motion.div
                      key={job.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-lg border border-red-200 bg-red-50/50 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{job.vehicle}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{job.issue}</p>
                        </div>
                        <Badge
                          variant={job.priority === "High" ? "destructive" : "secondary"}
                        >
                          {job.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Assigned: {job.assignedDate}</span>
                        <span className="text-red-600 font-medium">Due: {job.deadline}</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm text-mechanic font-medium mb-2">
                          Timer: {formatTime(jobTimer.seconds)}
                          {jobTimer.isDone && <span className="text-green-600 ml-2">✓ Done</span>}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {!jobTimer.isRunning && !jobTimer.isDone && (
                            <Button size="sm" className="bg-mechanic hover:bg-mechanic/90" onClick={() => startTimer(job.id)}>
                              Start
                            </Button>
                          )}
                          {jobTimer.isRunning && (
                            <Button size="sm" variant="outline" onClick={() => stopTimer(job.id)}>
                              Stop
                            </Button>
                          )}
                          {!jobTimer.isRunning && jobTimer.seconds > 0 && (
                            <Button size="sm" variant="outline" onClick={() => resetTimer(job.id)}>
                              Reset
                            </Button>
                          )}
                          {!jobTimer.isDone && (
                            <Button size="sm" variant="outline" onClick={() => markDone(job.id)}>
                              Mark Done
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => alert("Car details: " + job.vehicle)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-mechanic" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  Your daily task timeline
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-sm font-mono text-muted-foreground min-w-[3rem]">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${
                        item.status === 'completed' ? 'line-through text-muted-foreground' :
                        item.status === 'in-progress' ? 'font-medium text-mechanic' :
                        'text-foreground'
                      }`}>
                        {item.task}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-mechanic' :
                      'bg-muted'
                    }`}></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Daily Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Tasks Completed</span>
                    <span>3/4</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    You're ahead of schedule! Keep up the good work.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowAssignmentPopup(true)}>
            <CardContent className="p-6 text-center">
              <Wrench className="h-8 w-8 text-mechanic mx-auto mb-3" />
              <h3 className="font-semibold mb-2">All Assignments</h3>
              <p className="text-sm text-muted-foreground">View assigned vehicles</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowServiceReportPopup(true)}>
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-mechanic mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Service Reports</h3>
              <p className="text-sm text-muted-foreground">Upload & manage reports</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowJobTrackerPopup(true)}>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-mechanic mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Job Tracker</h3>
              <p className="text-sm text-muted-foreground">Update job status</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowAlertPopup(true)}>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-mechanic mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Alerts</h3>
              <p className="text-sm text-muted-foreground">Urgent notifications</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Popups */}
      {showAssignmentPopup && (
        <AssignmentPopup onClose={() => setShowAssignmentPopup(false)} />
      )}
      {showServiceReportPopup && (
        <ServiceReportPopup onClose={() => setShowServiceReportPopup(false)} />
      )}
      {showJobTrackerPopup && (
        <JobTrackerPopup onClose={() => setShowJobTrackerPopup(false)} />
      )}
      {showAlertPopup && (
        <AlertPopup onClose={() => setShowAlertPopup(false)} />
      )}
    </div>
  );
};
