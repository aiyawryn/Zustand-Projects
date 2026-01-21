import { FaPlus } from "react-icons/fa";
import { useStore } from "../store";

const MainArea = () => {
  const {
    lists,
    workspaces,
    selectedList,
    selectedWorkspace,
    todoText,
    todoDate,
    filterMode,

    setSelectedList,
    setSelectedWorkspace,
    setTodoText,
    setTodoDate,
    handleAddTodo,
    setFilterMode,
  } = useStore();

  return (
    <div className="flex-1 p-6">
      <div className="mb-4 flex flex-col gap-2">
        {/* Input field */}
        <div className="flex gap-2">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Add a new todo"
            className="border border-gray-300 p-2 rounded-lg w-full"
          />
          <input
            type="date"
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="mt-2 flex items-center">
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mr-2"
          >
            <option value="" disabled>
              Select List
            </option>
            {lists.map((list, index) => (
              <option key={index} value={list.name}>
                {list.emoji}
                {list.name}
              </option>
            ))}
          </select>
          <select
            value={selectedWorkspace}
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          >
            <option value="" disabled>
              Select Workspace
            </option>
            {workspaces.map((workspace, index) => (
              <option key={index} value={workspace.name}>
                {workspace.emoji}
                {workspace.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddTodo}
            className="bg-black text-white px-4 py-2 rounded-lg ml-4 flex items-center"
          >
            <FaPlus /> Add Todo
          </button>
        </div>
      </div>

      <hr className="my-6" />
      {/* Fiter Buttons*/}
      <div className="flex gap-4 mb-4">
        {["All", "Day", "Week", "Month"].map((mode) => (
          <button
            key={mode}
            onClick={() => setFilterMode(mode as any)}
            className={`px-4 py-1 rounded-full text-sm transition ${filterMode === mode ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainArea;
