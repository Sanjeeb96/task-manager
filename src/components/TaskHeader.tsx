// src/components/TaskHeader.tsx
import React from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface TaskHeaderProps {
  view: "board" | "list";
  setView: React.Dispatch<React.SetStateAction<"board" | "list">>;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ setView }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">TaskBuddy</h1>
        <div className="flex items-center gap-2 flex-row">
          <img
            src={user?.photoURL || "/default.svg"} // 👈 Update default avatar
            alt={"User"}
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
          <span>{user?.displayName}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 flex-row">
          <button
            className="flex flex-row items-center gap-1 cursor-pointer"
            onClick={() => setView("list")}
          >
            <FaList />
            <h3>List</h3>
          </button>
          <button
            className="flex flex-row items-center gap-1 cursor-pointer"
            onClick={() => setView("board")}
          >
            <FaThLarge />
            <h3>Board</h3>
          </button>
        </div>
        <div
          className="flex flex-row items-center gap-1 border rounded-lg p-2 background-pink-500 cursor-pointer"
          onClick={handleLogout}
        >
          <CiLogout />
          <button className="cursor-pointer">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
