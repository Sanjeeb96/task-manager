import React, { useState } from "react";
import { Task, TaskCategory } from "../types";

interface TaskFiltersProps {
  // In a real-world app you might pass functions to update filters in a parent component
}

const TaskFilters: React.FC<TaskFiltersProps> = () => {
  const [category, setCategory] = useState<TaskCategory | "All">("All");
  const [dueDate, setDueDate] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as TaskCategory | "All");
    // Update filtering logic in parent via context or props
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
    // Update filtering logic in parent via context or props
  };

  return (
    <div className="flex gap-4 mb-4 items-center text-gray-400">
      <h3 className="">Filter by:</h3>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="border rounded-full p-1 border-gray-300 cursor-pointer"
      >
        <option value="All">Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={handleDueDateChange}
        className="border rounded-full p-1 border-gray-300 cursor-pointer"
        placeholder="Filter by due date"
      />
    </div>
  );
};

export default TaskFilters;
