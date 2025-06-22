export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  assignedBy: string;
  assignedTo: string;
  progress: "assigned" | "inProgress" | "done" | "cancelled";
}
