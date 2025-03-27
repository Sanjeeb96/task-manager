// src/components/TaskActionBar.tsx
import React from "react";
import TaskFilters from "./TaskFilters";
import TaskSearch from "./TaskSearch";
import { Task } from "../types";

interface TaskActionBarProps {
  tasks: Task[];
  onAddTaskClick: () => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskActionBar: React.FC<TaskActionBarProps> = ({
  tasks,
  onAddTaskClick,
  setFilteredTasks,
}) => {
  return (
    <div className="flex justify-between items-center">
      <TaskFilters />
      <div className="flex gap-2 items-center">
        <TaskSearch tasks={tasks} onFilteredTasks={setFilteredTasks} />
        <button
          className="py-2 px-4 border cursor-pointer rounded-full text-white bg-[#7B1984] text-sm mb-4"
          onClick={onAddTaskClick}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskActionBar;
