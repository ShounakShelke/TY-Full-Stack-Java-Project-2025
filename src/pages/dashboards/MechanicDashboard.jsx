import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Calendar, CheckCircle, AlertTriangle, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JobTrackerPopup } from "@/components/popups/JobTrackerPopup";
import { AlertPopup } from "@/components/popups/AlertPopup";
import { getDashboard } from "../../api/dashboard";

export const MechanicDashboard = () => {
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [showServiceReportPopup, setShowServiceReportPopup] = useState(false);
  const [showJobTrackerPopup, setShowJobTrackerPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);

  // Track timers for each job by job id
  const [jobTimers, setJobTimers] = useState({});
  const [stats, setStats] = useState([]);
  const [urgentJobs, setUrgentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    setErr("");
    try {
      const data = await getDashboard("mechanic");
      setStats(data.stats || []);
      setUrgentJobs(data.urgentJobs || []);
    } catch (e) {
      setErr((e && e.message) || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  // Job timer logic stays
  useEffect(() => {
    const activeJobIds = Object.keys(jobTimers).filter(
      (jobId) => jobTimers[jobId].isRunning
    );
    if (activeJobIds.length === 0) return;
    const interval = setInterval(() => {
      setJobTimers((prevTimers) => {
        const updatedTimers = { ...prevTimers };
        activeJobIds.forEach((jobId) => { updatedTimers[jobId].seconds += 1; });
        return updatedTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [jobTimers]);
  // Timer handlers unchanged
  const startTimer = jobId => setJobTimers(prev => ({ ...prev, [jobId]: { seconds: prev[jobId]?.seconds || 0, isRunning: true, isDone: false } }));
  const stopTimer = jobId => setJobTimers(prev => ({ ...prev, [jobId]: { ...prev[jobId], isRunning: false } }));
  const resetTimer = jobId => setJobTimers(prev => ({ ...prev, [jobId]: { seconds: 0, isRunning: false, isDone: false } }));
  const markDone = jobId => setJobTimers(prev => ({ ...prev, [jobId]: { ...prev[jobId], isDone: true, isRunning: false } }));
  const statIcons = [Wrench, Clock, CheckCircle, AlertTriangle];
  const statColors = ["mechanic", "orange-500", "green-500", "red-500"];
  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;

  // ...render logic is same, but pulls stats/urgentJobs from backend now
  return (
    <div className="min-h-screen bg-background theme-mechanic">
      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-foreground">Service Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track maintenance jobs and vehicle status</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowServiceReportPopup(true)}>
              <FileText className="h-4 w-4 mr-2" /> Upload Report
            </Button>
            <Button className="bg-mechanic hover:bg-mechanic/90" onClick={() => alert("Marked as complete")}> <CheckCircle className="h-4 w-4 mr-2" />Mark Complete</Button>
          </div>
        </div>
      </motion.header>
      <div className="p-6">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = statIcons[index] || Wrench;
            const color = statColors[index] || "mechanic";
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2 }} whileHover={{ y: -5 }}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                    <IconComponent className={`h-4 w-4 text-${color}`} />
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" />Urgent Maintenance Jobs</CardTitle><CardDescription>High priority tasks requiring immediate attention</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {urgentJobs.map((job) => {
                  const jobTimer = jobTimers[job.id] || { seconds: 0, isRunning: false, isDone: false };
                  const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };
                  return (
                    <motion.div key={job.id} whileHover={{ scale: 1.01 }} className="p-4 rounded-lg border border-red-200 bg-red-50/50 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1"><h4 className="font-semibold text-foreground">{job.vehicle}</h4><p className="text-sm text-muted-foreground mt-1">{job.issue}</p></div>
                        <Badge variant={job.priority === "High" ? "destructive" : "secondary"}>{job.priority}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Assigned: {job.assignedDate}</span>
                        <span className="text-red-600 font-medium">Due: {job.deadline}</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm text-mechanic font-medium mb-2">Timer: {formatTime(jobTimer.seconds)}{jobTimer.isDone && <span className="text-green-600 ml-2">✓ Done</span>}</div>
                        <div className="flex gap-2 flex-wrap">
                          {!jobTimer.isRunning && !jobTimer.isDone && (
                            <Button size="sm" className="bg-mechanic hover:bg-mechanic/90" onClick={() => startTimer(job.id)}>Start</Button>
                          )}
                          {jobTimer.isRunning && (
                            <Button size="sm" variant="outline" onClick={() => stopTimer(job.id)}>Stop</Button>
                          )}
                          {!jobTimer.isRunning && jobTimer.seconds > 0 && (
                            <Button size="sm" variant="outline" onClick={() => resetTimer(job.id)}>Reset</Button>
                          )}
                          {!jobTimer.isDone && (
                            <Button size="sm" variant="outline" onClick={() => markDone(job.id)}>Mark Done</Button>
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
          {/* Today's schedule, job tracker popups, etc. remain unchanged */}
        </div>
        {/* Quick Actions and popups remain unchanged */}
        {showAssignmentPopup && <JobTrackerPopup onClose={() => setShowAssignmentPopup(false)} />}
        {showServiceReportPopup && <AlertPopup onClose={() => setShowServiceReportPopup(false)} />}
        {showJobTrackerPopup && <JobTrackerPopup onClose={() => setShowJobTrackerPopup(false)} />}
        {showAlertPopup && <AlertPopup onClose={() => setShowAlertPopup(false)} />}
      </div>
    </div>
  );
};
