import React, { useState, createContext, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  //   SortableContext,
  //   verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Task, TaskStatus } from "../types";
// import TaskCard from "./TaskCard";
import TaskModal from "./TaskModel";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import TaskHeader from "./TaskHeader";
import TaskActionBar from "./TaskActionBar";
import PopupMenu from "./PopupMenu";
// import { getAuth } from "firebase/auth";
interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | null>(null);

type TaskBoardProps = Record<string, never>;

const TaskBoard: React.FC<TaskBoardProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [view, setView] = useState<"board" | "list">("list");
  const statuses: TaskStatus[] = ["TO-DO", "IN-PROGRESS", "COMPLETED"];

  // ✅ Fetch Tasks from Firestore
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      //   console.log("Fetched tasks:", fetchedTasks);
      setTasks(fetchedTasks);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the list
  };

  const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((prevTasks) => {
      const oldIndex = prevTasks.findIndex((task) => task.id === active.id);
      const newIndex = prevTasks.findIndex((task) => task.id === over.id);
      return arrayMove(prevTasks, oldIndex, newIndex);
    });
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  interface HandleDeleteProps {
    taskId: string;
  }

  const handleDelete = async (
    taskId: HandleDeleteProps["taskId"]
  ): Promise<void> => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    try {
      console.log("Deleting task with ID:", taskId);
      await deleteDoc(doc(db, "tasks", taskId)); // Delete from Firebase
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log(`Task with ID ${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleOpenEditModal = (task: Task) => {
    console.log("Editing Task:", task);
    setSelectedTask(task); // Set the selected task
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedTask(null); // Clear the selected task
    setIsModalOpen(false); // Close the modal
  };

  // Determine which tasks to display (filtered or all)
  const tasksToDisplay = filteredTasks.length > 0 ? filteredTasks : tasks;

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, filteredTasks, setFilteredTasks }}
    >
      <div className="p-4 max-w-6xl mx-auto flex flex-col">
        {/* TaskHeader Component */}
        <TaskHeader setView={setView} view={view} />

        {/* TaskActionBar Component */}
        <TaskActionBar
          tasks={tasks}
          onAddTaskClick={() => setIsModalOpen(true)}
          setFilteredTasks={setFilteredTasks}
        />
        <hr className="mb-4" />

        {/* TaskModal Component */}
        <TaskModal
          isOpen={isModalOpen}
          existingTask={selectedTask || undefined}
          onTaskUpdated={handleTaskUpdated}
          onClose={closeModal} // Close the modal
          onTaskCreated={handleTaskCreated} // Handle the task creation
        />

        {view === "list" ? (
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-2">Task Name</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Category</th>
                  <th className="p-2"> </th>
                </tr>
              </thead>
              {statuses.map((status) => {
                // const filteredTasks = tasks.filter(
                //   (task) => task.status === status
                // );
                const filteredByStatus = tasksToDisplay.filter(
                  (task) => task.status === status
                );
                return (
                  <tbody key={status}>
                    {/* Status Header Row */}
                    <tr>
                      <td
                        colSpan={5}
                        className={`text-lg font-bold text-black rounded-t-[8px] p-1 ${
                          status === "TO-DO"
                            ? "bg-[#FAC3FF]"
                            : status === "IN-PROGRESS"
                            ? "bg-[#85D9F1]"
                            : "bg-[#CEFFCC]"
                        }`}
                      >
                        {/* {status} ({filteredTasks.length}) */}
                        {status} ({filteredByStatus.length})
                      </td>
                    </tr>
                    {/* Task Rows */}
                    {filteredByStatus.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-gray-500 p-2">
                          No tasks in {status}
                        </td>
                      </tr>
                    ) : (
                      filteredByStatus.map((task, index) => {
                        const isLastRow = index === filteredByStatus.length - 1;
                        return (
                          <React.Fragment key={task.id}>
                            {/* Horizontal line above each task */}
                            <tr>
                              <td colSpan={5}>
                                <hr className="border-gray-300" />
                              </td>
                            </tr>
                            <tr
                              className={`bg-[#F1F1F1] ${
                                isLastRow ?? "rounded-b-[10px] overflow-hidden"
                              }`}
                            >
                              <td className="p-2">{task.name}</td>
                              <td className="p-2">{task.dueDate || "N/A"}</td>
                              <td className="p-2">{task.status}</td>
                              <td className="p-2">{task.category}</td>
                              <td className="p-2">
                                <PopupMenu
                                  onEdit={() => handleOpenEditModal(task)}
                                  onDelete={() => handleDelete(task.id)}
                                />
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })
                    )}
                    {/* Spacer row for margin */}
                    <tr>
                      <td colSpan={5} className="h-4"></td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        ) : (
          // Board View
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-3 gap-4">
              {statuses.map((status) => (
                <div key={status} className="bg-gray-100 p-4 rounded-lg">
                  <h2
                    className={`text-xl font-sm text-black rounded-sm p-1 ${
                      status === "TO-DO"
                        ? "bg-[#FAC3FF]"
                        : status === "IN-PROGRESS"
                        ? "bg-[#85D9F1]"
                        : "bg-[#CEFFCC]"
                    }`}
                  >
                    {status.replace("-", " ")}
                  </h2>
                  <div className="mt-2">
                    {tasks.filter((task) => task.status === status).length ===
                    0 ? (
                      <p className="text-gray-500">No tasks</p>
                    ) : (
                      tasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                          <div
                            key={task.id}
                            className={`p-2 border-l-4 ${
                              status === "TO-DO"
                                ? "border-[#FAC3FF]"
                                : status === "IN-PROGRESS"
                                ? "border-[#85D9F1]"
                                : "border-[#CEFFCC]"
                            }`}
                          >
                            {task.name}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DndContext>
        )}
      </div>
    </TaskContext.Provider>
  );
};

export default TaskBoard;
