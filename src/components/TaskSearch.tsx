import React, { useEffect, useState } from "react";
import { Task } from "../types";

interface TaskSearchProps {
  // In a real-world app, you'd pass the tasks and update filtered list via a callback or context
  tasks: Task[]; // List of all tasks
  onFilteredTasks: (filteredTasks: Task[]) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ tasks, onFilteredTasks }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Update search filtering logic via context or callback
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler); // Cleanup timeout on query change
    };
  }, [query]);

  // Filter tasks based on the debounced query
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      onFilteredTasks([]); // If query is empty, reset filtered tasks
      return;
    }

    const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    onFilteredTasks(filteredTasks); // Update filtered tasks
  }, [debouncedQuery, tasks, onFilteredTasks]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="p-1 border rounded-full border-gray-300 text-grey-600"
      />
    </div>
  );
};

export default TaskSearch;
