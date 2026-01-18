import useNotesStore from "../store";
import { FiSearch, FiTrash2 } from "react-icons/fi";

const Sidebar = () => {
  const { notes, search, selectNote, setSearch, deleteNote } = useNotesStore();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="w-1/3 bg-white p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <FiSearch className="text-xl mr-2" />
        <input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-b focus:outline-none"
        />
      </div>
      {/* Note List */}
      <div>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 mb-2 rounded-lg shadow cursor-pointer border hover:bg-gray-200"
            >
              {/* Left side, Color Circle */}
              <div
                onClick={() => selectNote(index)}
                className="flex items-center flex-1"
              >
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{
                    backgroundColor: note.color,
                    border: "1px solid #000",
                  }}
                />
                <p
                  className="text-sm truncate"
                  dangerouslySetInnerHTML={{
                    __html: note.text.slice(0, 80),
                  }}
                />
              </div>

              {/* Delete button */}
              <FiTrash2
                onClick={() => deleteNote(index)}
                className="text-gray-400 hover:text-red-700 ml-2"
              />
            </div>
          ))
        ) : (
          <p>No New Notes</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
