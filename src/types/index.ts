export type TaskStatus = "TO-DO" | "IN-PROGRESS" | "COMPLETED";
export type TaskCategory = "Work" | "Personal";

export interface Activity {
  id: string;
  type: "CREATED" | "UPDATED" | "DELETED" | "FILE_UPLOADED";
  message: string;
  timestamp: string;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  category: TaskCategory;
  dueDate: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
  // createdBy?: string;
  activityLog?: Activity[];
  attachments?: string[];
}
