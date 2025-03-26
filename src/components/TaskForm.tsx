import React, { useState } from "react";
import { Task, TaskCategory, TaskStatus } from "../types";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

interface TaskFormProps {
  existingTask?: Task;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask, onClose }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: Partial<Task> = {
      name,
      description,
      category,
      dueDate,
      status,
      updatedAt: new Date().toISOString(),
    };

    if (existingTask) {
      // Update the task in Firebase
      const taskRef = doc(db, "tasks", existingTask.id);
      await updateDoc(taskRef, taskData);
    } else {
      // Create a new task in Firebase
      const newTask = {
        ...taskData,
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, "tasks"), newTask);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {existingTask ? "Edit Task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Task Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TO-DO">To-Do</option>
              <option value="IN-PROGRESS">In-Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {existingTask ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
