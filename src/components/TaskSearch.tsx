import React, { useState } from "react";

interface TaskSearchProps {
  // In a real-world app, you'd pass the tasks and update filtered list via a callback or context
}

const TaskSearch: React.FC<TaskSearchProps> = () => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Update search filtering logic via context or callback
  };

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
