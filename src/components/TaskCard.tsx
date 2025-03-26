import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Task } from "../types";
import { db } from "../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

interface TaskCardProps {
  task: Task;
  provided?: DraggableProvided;
  openEdit?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, provided, openEdit }) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
    // You may want to trigger a refresh or update state after deletion.
  };

  return (
    <div
      ref={provided?.innerRef}
      {...(provided?.draggableProps || {})}
      {...(provided?.dragHandleProps || {})}
      className="bg-white p-4 rounded shadow mb-2"
    >
      <h3 className="font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
      <p className="text-sm">{task.category}</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => openEdit && openEdit(task)}
          className="text-blue-500 text-sm"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-500 text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
