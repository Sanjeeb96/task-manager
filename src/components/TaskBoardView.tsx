// src/components/TaskBoardView.tsx
import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { TaskStatus } from "../types";
import { useTaskContext } from "../contexts/TaskContext";

const statuses: TaskStatus[] = ["TO-DO", "IN-PROGRESS", "COMPLETED"];

const TaskBoardView: React.FC = () => {
  const { tasks } = useTaskContext();

//   const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
//     // For now, we're not implementing sorting logic.
//     // You can add sorting logic later.
//   };
const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // setTasks((prevTasks) => {
    //   const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
    //   const newIndex = prevTasks.findIndex((task) => task.id === over.id);
    //   return arrayMove(prevTasks, oldIndex, newIndex);
    // });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold">
              {status === "TO-DO"
                ? "To-Do"
                : status === "IN-PROGRESS"
                ? "In-Progress"
                : "Completed"}
            </h2>
            <div className="mt-2">
              {tasks.filter((task) => task.status === status).length === 0 ? (
                <p className="text-gray-500">No tasks</p>
              ) : (
                tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className={`p-2 border-l-4 ${
                        status === "TO-DO"
                          ? "border-blue-500"
                          : status === "IN-PROGRESS"
                          ? "border-yellow-500"
                          : "border-green-500"
                      }`}
                    >
                      <h3 className="font-semibold">{task.name}</h3>
                      <p className="text-sm text-gray-600">
                        {task.description}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoardView;
