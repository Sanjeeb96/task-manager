import React, { useState, useRef, useEffect } from "react";
import { Task, TaskCategory, TaskStatus, Activity } from "../types";
import { db } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc as fetchDoc,
  arrayUnion,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
// import { auth } from "../firebase/firebaseConfig"; // Import auth from your Firebase config
import ActivityLog from "./ActivityLog";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingTask?: Task;
  onTaskCreated: (task: Task) => void;
  onTaskUpdated: (updatedTask: Task) => void; // Callback for updating tasks
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  existingTask,
  onTaskCreated,
  onTaskUpdated,
}) => {
  const [name, setName] = useState(existingTask?.name || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );
  const [category, setCategory] = useState<TaskCategory>(
    existingTask?.category || "Work"
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
  const [status, setStatus] = useState<TaskStatus>(
    existingTask?.status || "TO-DO"
  );
  //   const [attachments, setAttachments] = useState<File[]>([]);
  const [activityLog] = useState<Activity[]>(existingTask?.activityLog || []);

  // Close modal on outside click (optional)
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Existing Task:", existingTask); // Debugging
    if (existingTask) {
      setName(existingTask.name);
      setDescription(existingTask.description || "");
      setCategory(existingTask.category);
      setDueDate(existingTask.dueDate);
      setStatus(existingTask.status);
    } else {
      // Reset fields for creating a new task
      setName("");
      setDescription("");
      setCategory("Work");
      setDueDate("");
      setStatus("TO-DO");
    }
  }, [existingTask]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Task fields
    const taskData: Task = {
      id: existingTask?.id || Date.now().toString(), // Generate an ID for new tasks
      name,
      description,
      category,
      dueDate,
      status,
      createdAt: existingTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activityLog: existingTask?.activityLog || [],
      attachments: [], // (Optional) Attachments for future implementation
    };

    // We’ll add an activity to the log
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: existingTask ? "UPDATED" : "CREATED",
      message: existingTask ? `Task updated: ${name}` : `Task created: ${name}`,
      timestamp: new Date().toISOString(),
    };

    // If editing
    try {
      if (existingTask?.id) {
        const taskRef = doc(db, "tasks", existingTask.id);
        console.log("Document Path:", taskRef.path); // Debugging
        const taskSnapshot = await getDoc(taskRef);

        if (!taskSnapshot.exists()) {
          console.error("No document found with ID:", existingTask.id);
          console.log("Task Reference:", taskRef);
          return;
        }
        console.log("Document Data:", taskSnapshot.data());
        await updateDoc(taskRef, {
          ...taskData,
          // Attach new activity to existing log
          activityLog: arrayUnion(newActivity),
        });
        console.log("OnTaskUpdated:", onTaskUpdated(taskData));
        onTaskUpdated(taskData);
        // Update the task list in TaskBoard
      } else {
        // If creating new
        const newTask = {
          ...taskData,
          createdAt: new Date().toISOString(),
          activityLog: [newActivity],
        };
        const docRef = await addDoc(collection(db, "tasks"), newTask);
        taskData.id = docRef.id; // Assign Firestore ID to the task
        onTaskCreated(taskData); // Update the task list in TaskBoard
      }

      console.log("Task Data:", taskData);

      // (Optional) handle file upload logic to Firebase Storage here
      // attachments.forEach((file) => { ... })

      setName("");
      setDescription("");
      setCategory("Work");
      setDueDate("");
      setStatus("TO-DO");
      //   setAttachments([]);
      onClose();
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl w-full max-w-2xl mx-4 md:mx-auto flex"
      >
        {/* Left Content (Form) */}
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">
            {existingTask ? "Edit Task" : "Create Task"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Description */}
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Task Title
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Task Title"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded min-h-[100px]"
                placeholder="Task Description"
              ></textarea>
            </div>

            {/* Category, Due Date, Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm font-semibold ">
                  Task Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TaskCategory)}
                  className="w-full p-2 border rounded cursor-pointer"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold">
                  Task Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full p-2 border rounded cursor-pointer"
                >
                  <option value="TO-DO">To-Do</option>
                  <option value="IN-PROGRESS">In-Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Attachment
              </label>
              <div className="border-2 border-dashed rounded p-4 text-center text-sm">
                <p className="mb-2">Drag your files here or click to upload</p>
                <input
                  type="file"
                  multiple
                  //   onChange={handleFileChange}
                  className="w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
              >
                {existingTask ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Content (Activity Log) */}
        {existingTask && <div className=" bg-gray-200"></div>}
        {existingTask && (
          <div className="hidden md:block w-60 p-6 bg-gray-50 border-l border-gray-200">
            <h3 className="text-md font-bold mb-4">Activity</h3>
            <ActivityLog activityLog={activityLog} />
          </div>
        )}
      </div>
    </div>
  );
};

function getDoc(taskRef: DocumentReference<DocumentData, DocumentData>) {
  return fetchDoc(taskRef);
}

export default TaskModal;
