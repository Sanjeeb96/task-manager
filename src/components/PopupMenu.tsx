import { useState, useRef, useEffect } from "react";

interface PopupMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const PopupMenu = ({ onEdit, onDelete }: PopupMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-black px-2"
      >
        ...
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 right-0 mt-2 w-24 bg-white shadow-md rounded-md border border-gray-300"
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-green-100"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
