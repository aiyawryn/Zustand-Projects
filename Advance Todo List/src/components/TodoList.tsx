import React from "react";
import { useStore } from "../store";
import { MdMoreVert } from "react-icons/md";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TodoList = () => {
  const {
    todos,
    filterMode,
    toggleTodo,
    editIndex,
    editText,
    dropdownIndex,
    handleEdit,
    handleUpdate,
    handleDropdownClick,
    deleteTodo,
    setEditIndex,
    setEditText,
  } = useStore();

  //   Filter todos
  const filteredTodos = todos.filter((todo) => {
    const today = new Date().toISOString().split("T")[0];
    const todoDate = new Date(todo.date);
    const now = new Date();

    if (filterMode === "Day") return todo.date === today;

    if (filterMode === "Week") {
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(now.getDate() + 7);
      return todoDate >= now && todoDate <= sevenDaysLater;
    }

    if (filterMode === "Month") {
      return todo.date.substring(0, 7) === today.substring(0, 7);
    }

    return true; // for "All"
  });
  return (
    <div className="mt-6 px-8">
      <h2 className="text-xl font-semibold mb-4 ml-[2rem]">
        Todo List ({filterMode})
      </h2>

      <ul className="list-none pl-0">
        {filteredTodos.map((todo, index) => (
          <li key={index} className="mb-2 ml-[2rem]">
            {editIndex === index ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border border-gray-300 p-1 rounded-lg mr-2"
                />
                <button
                  onClick={() => handleUpdate(index)}
                  className="bg-green-500 text-white px-2 py-1 rounded-lg mr-2"
                >
                  Update
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded-lg "
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-pointer tex-xl"
                    onClick={() => toggleTodo(index)}
                  >
                    {todo.completed ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaRegCircle className="text-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                    >
                      <strong>{todo.text}</strong>
                    </span>
                    <span className="text-xs text-gray-400">
                      {todo.date}| List: {todo.list} | Workspace:{" "}
                      {todo.workspace}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <MdMoreVert
                    className="cursor-pointer"
                    size={24}
                    onClick={() => handleDropdownClick(index)}
                  />
                  {dropdownIndex === index && (
                    <>
                      {/* 1. Invisible Background to handle close Dropdown */}
                      <div
                        className="fixed inset-0 z-10 cursor-default"
                        onClick={() => handleDropdownClick(index)} //Toggle
                      ></div>
                      {/* 2. Dropdown Menu */}
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-20">
                        <button
                          onClick={() => handleEdit(index)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteTodo(index)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {filteredTodos.length === 0 && (
        <p className="ml-[4rem] text-gray-400">No tasks found for this view.</p>
      )}
    </div>
  );
};

export default TodoList;
