import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Calendar, CheckCircle, AlertTriangle, FileText, Clock, LogOut, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JobTrackerPopup } from "@/components/popups/JobTrackerPopup";
import { AlertPopup } from "@/components/popups/AlertPopup";
import { AddMaintenanceJobPopup } from "@/components/popups/AddMaintenanceJobPopup";
import { MessageInbox } from "../../components/MessageInbox";
import { getDashboard } from "../../api/dashboard";
import { getMaintenanceJobs, addMaintenanceJob, updateMaintenanceJob, deleteMaintenanceJob } from "../../api/maintenance";
import { useAuth } from "../../context/AuthContext";

export const MechanicDashboard = () => {
  const { logout } = useAuth();
  const [showAssignmentPopup, setShowAssignmentPopup] = useState(false);
  const [showServiceReportPopup, setShowServiceReportPopup] = useState(false);
  const [showJobTrackerPopup, setShowJobTrackerPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [showAddMaintenanceJobPopup, setShowAddMaintenanceJobPopup] = useState(false);
  const [showMessageInbox, setShowMessageInbox] = useState(false);
  const [maintenanceJobs, setMaintenanceJobs] = useState([]);

  // Track timers for each job by job id
  const [jobTimers, setJobTimers] = useState({});
  const [stats, setStats] = useState([]);
  const [urgentJobs, setUrgentJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchDashboard();
    fetchMaintenanceJobs();
  }, []);

  useEffect(() => {
    if (!showAddMaintenanceJobPopup) {
      fetchDashboard();
      fetchMaintenanceJobs();
    }
  }, [showAddMaintenanceJobPopup]);

  async function fetchMaintenanceJobs() {
    try {
      const jobs = await getMaintenanceJobs();
      setAllJobs(Array.isArray(jobs) ? jobs : []);
      // Filter urgent jobs
      const urgent = Array.isArray(jobs) ? jobs.filter(j => j && (j.priority === "Urgent" || j.priority === "High")) : [];
      setUrgentJobs(urgent);
    } catch (e) {
      console.error("Failed to fetch maintenance jobs:", e);
      setAllJobs([]);
      setUrgentJobs([]);
    }
  }

  async function fetchDashboard() {
    setLoading(true);
    setErr("");
    try {
      const data = await getDashboard("mechanic");
      // Ensure stats is an array with proper structure
      const safeStats = Array.isArray(data?.stats) ? data.stats.filter(s => s && s.label) : [];
      // If no stats, provide defaults
      if (safeStats.length === 0) {
        safeStats.push(
          { label: "Active Jobs", value: "0" },
          { label: "Completed Today", value: "0" },
          { label: "Pending", value: "0" },
          { label: "Urgent", value: "0" }
        );
      }
      setStats(safeStats);
      setUrgentJobs(Array.isArray(data?.urgentJobs) ? data.urgentJobs.filter(j => j) : []);
    } catch (e) {
      console.error("Dashboard fetch error:", e);
      setErr((e && e.message) || "Failed to load dashboard");
      // Set default stats on error
      setStats([
        { label: "Active Jobs", value: "0" },
        { label: "Completed Today", value: "0" },
        { label: "Pending", value: "0" },
        { label: "Urgent", value: "0" }
      ]);
      setUrgentJobs([]);
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
            <Button variant="outline" onClick={() => setShowAddMaintenanceJobPopup(true)}>
              <Wrench className="h-4 w-4 mr-2" /> Add Maintenance Job
            </Button>
            <Button variant="outline" onClick={() => setShowServiceReportPopup(true)}>
              <FileText className="h-4 w-4 mr-2" /> Upload Report
            </Button>
            <Button variant="outline" onClick={() => setShowMessageInbox(true)}>
              <MessageSquare className="h-4 w-4 mr-2" /> Messages
            </Button>
            <Button className="bg-mechanic hover:bg-mechanic/90" onClick={() => alert("Marked as complete")}> <CheckCircle className="h-4 w-4 mr-2" />Mark Complete</Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.header>
      <div className="p-6">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.isArray(stats) && stats.length > 0 ? stats.filter(s => s && s.label).map((stat, index) => {
            const IconComponent = statIcons[index] || Wrench;
            const color = statColors[index] || "mechanic";
            return (
              <motion.div key={stat.label || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2 }} whileHover={{ y: -5 }}>
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label || "N/A"}</CardTitle>
                    <IconComponent className={`h-4 w-4 text-${color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value || "0"}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          }).filter(Boolean) : (
            <div className="col-span-4 text-center py-4 text-muted-foreground">
              No statistics available
            </div>
          )}
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
        {showAddMaintenanceJobPopup && (
          <AddMaintenanceJobPopup
            isOpen={showAddMaintenanceJobPopup}
            onClose={(refresh) => {
              setShowAddMaintenanceJobPopup(false);
              if (refresh) {
                fetchDashboard();
                fetchMaintenanceJobs();
              }
            }}
          />
        )}
        {showMessageInbox && (
          <MessageInbox
            onClose={() => setShowMessageInbox(false)}
          />
        )}
      </div>
    </div>
  );
};
