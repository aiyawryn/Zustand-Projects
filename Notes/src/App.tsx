import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useNotesStore from "./store";
import { AiOutlinePlus } from "react-icons/ai";
import Sidebar from "./components/Sidebar";

const App = () => {
  const {
    editorContent,
    noteColor,
    currentNoteIndex,
    setEditorContent,
    setNoteColor,
    addOrUpdateNote,
  } = useNotesStore();

  const isEmpty =
    !editorContent ||
    editorContent === "<p><br></p>" ||
    editorContent.replace(/<(.|\n)*?>/g, "").trim() === "";
  return (
    <div className="h-screen flex">
      {/* sidebar */}

      <Sidebar />
      {/* Main Area */}

      <div className="w-2/3 p-8 flex flex-col">
        {/* Text Editor (React Quill)*/}
        <ReactQuill
          theme="snow"
          placeholder="Write your note here..."
          className="h-96 bg-white mb-[2rem]"
          value={editorContent}
          onChange={setEditorContent}
        />

        {/* Color Selector */}
        <div className="flex ml-[1rem] items-center mt-6 space-x-4">
          <input
            type="color"
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            className="w-10 h-10 rounded-full appearance-none border-2 border-gray-400 cursor-pointer overflow-hidden"
          />
          <p>Choose a note color</p>
        </div>

        {/* Save Button */}
        <button
          onClick={addOrUpdateNote}
          disabled={isEmpty}
          className={`ml-[1rem] text-white py-2 px-4 mt-4 rounded-lg shadow-lg flex justify-center items-center ${isEmpty ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          <AiOutlinePlus className="mr-2" />
          {currentNoteIndex !== null ? "Update Note" : "Save note"}
        </button>
      </div>
    </div>
  );
};

export default App;
