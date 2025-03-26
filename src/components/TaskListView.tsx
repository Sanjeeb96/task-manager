// src/components/TaskListView.tsx
import React from "react";
import { TaskStatus } from "../types";
import { useTaskContext } from "../contexts/TaskContext";

const statuses: TaskStatus[] = ["TO-DO", "IN-PROGRESS", "COMPLETED"];

const TaskListView: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      {statuses.map((status) => {
        const filteredTasks = tasks.filter((task) => task.status === status);
        return (
          <div key={status} className="mb-4">
            <h2 className="text-lg font-bold mb-2">
              {status === "TO-DO"
                ? "To-Do"
                : status === "IN-PROGRESS"
                ? "In-Progress"
                : "Completed"}{" "}
              ({filteredTasks.length})
            </h2>
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500">No tasks in {status}</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="text-left text-sm text-gray-400">
                    <th className="border border-gray-300 p-2">Task Name</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td className="border border-gray-300 p-2">
                        {task.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {task.status}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {task.category}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {task.dueDate || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskListView;
