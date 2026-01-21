import { create } from "zustand";

interface List {
  name: string;
  emoji: string;
}

interface Workspace {
  name: string;
  emoji: string;
}

interface Todo {
  text: string;
  list: string;
  workspace: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
}

interface AppState {
  // state
  lists: List[];
  workspaces: Workspace[];
  todos: Todo[];
  editIndex: number | null;
  editText: string;
  dropdownIndex: number | null;
  isListModalOpen: boolean;
  isWorkspaceModalOpen: boolean;
  selectedList: string;
  selectedWorkspace: string;
  todoText: string;
  todoDate: string;
  modalName: string;
  modalEmoji: string;
  modalType: "List" | "Workspace" | null;
  filterMode: "All" | "Day" | "Week" | "Month";

  //   action
  addList: (name: string, emoji: string) => void;
  addWorkspace: (name: string, emoji: string) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (index: number, updatedTodo: Todo) => void;
  deleteTodo: (index: number) => void;

  handleEdit: (index: number) => void;
  handleUpdate: (index: number) => void;
  handleDropdownClick: (index: number) => void;

  setEditIndex: (index: number | null) => void;
  setEditText: (text: string) => void;

  openListModal: () => void;
  openWorkspaceModal: () => void;
  closeListModal: () => void;
  closeWorkspaceModal: () => void;

  setSelectedList: (list: string) => void;
  setSelectedWorkspace: (workspace: string) => void;
  setTodoText: (text: string) => void;
  setTodoDate: (date: string) => void;
  setFilterMode: (mode: "All" | "Day" | "Week" | "Month") => void;

  handleAddTodo: () => void;

  setModalName: (name: string) => void;
  setModalEmoji: (emoji: string) => void;
  setModalType: (type: "List" | "Workspace") => void;
  handleSaveModal: () => void;

  toggleTodo: (index: number) => void;
}

export const useStore = create<AppState>((set) => ({
  lists: [],
  workspaces: [],
  todos: [],
  editIndex: null,
  editText: "",
  dropdownIndex: null,
  isListModalOpen: false,
  isWorkspaceModalOpen: false,
  selectedList: "",
  selectedWorkspace: "",
  todoText: "",
  todoDate: new Date().toISOString().split("T")[0],
  modalName: "",
  modalEmoji: "",
  modalType: null,
  filterMode: "All",

  addList: (name, emoji) =>
    set((state) => ({
      lists: [...state.lists, { name, emoji }],
    })),

  addWorkspace: (name, emoji) =>
    set((state) => ({ workspaces: [...state.workspaces, { name, emoji }] })),

  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  toggleTodo: (index) =>
    set((state) => ({
      todos: state.todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),

  updateTodo: (index, updatedTodo) =>
    set((state) => {
      const newTodos = [...state.todos];
      newTodos[index] = updatedTodo;

      return {
        todos: newTodos,
        editIndex: null,
        editText: "",
      };
    }),

  deleteTodo: (index) =>
    set((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
      dropdownIndex: null,
    })),

  handleEdit: (index) =>
    set((state) => ({
      editIndex: index,
      editText: state.todos[index].text,
      dropdownIndex: null,
    })),

  handleUpdate: (index) =>
    set((state) => {
      const updatedTodo = {
        ...state.todos[index],
        text: state.editText,
      };

      const newTodos = [...state.todos];
      newTodos[index] = updatedTodo;

      return {
        todos: newTodos,
        editIndex: null,
        editText: "",
      };
    }),

  handleDropdownClick: (index) =>
    set((state) => ({
      dropdownIndex: index === state.dropdownIndex ? null : index,
    })),

  setEditText: (text) => set({ editText: text }),
  setEditIndex: (index) => set({ editIndex: index }),

  openListModal: () => set({ isListModalOpen: true, modalType: "List" }),
  closeListModal: () =>
    set({ isListModalOpen: false, modalName: "", modalEmoji: "" }),

  openWorkspaceModal: () =>
    set({ isWorkspaceModalOpen: true, modalType: "Workspace" }),
  closeWorkspaceModal: () =>
    set({ isWorkspaceModalOpen: false, modalName: "", modalEmoji: "" }),

  setSelectedList: (list) => set({ selectedList: list }),
  setSelectedWorkspace: (workspace) => set({ selectedWorkspace: workspace }),
  setTodoText: (text) => set({ todoText: text }),
  setTodoDate: (date) => set({ todoDate: date }),
  setFilterMode: (mode) => set({ filterMode: mode }),

  handleAddTodo: () =>
    set((state) => {
      const { todoText, todoDate, selectedList, selectedWorkspace } = state;

      if (todoText.trim() === "") {
        window.alert("Todo cannot be empty");
        return state;
      }

      const newTodo = {
        text: todoText,
        list: selectedList,
        workspace: selectedWorkspace,
        completed: false,
        date: todoDate,
      };
      return {
        todos: [...state.todos, newTodo],
        todoText: "",
        selectedList: "",
        selectedWorkspace: "",
        todoDate: new Date().toISOString().split("T")[0],
      };
    }),

  setModalName: (name) => set({ modalName: name }),
  setModalEmoji: (emoji) => set({ modalEmoji: emoji }),
  setModalType: (type) => set({ modalType: type }),

  handleSaveModal: () =>
    set((state) => {
      const { modalName, modalEmoji, modalType } = state;

      if (modalName.trim() === "") return state;

      if (modalType === "List") {
        state.addList(modalName, modalEmoji);
      } else if (modalType === "Workspace") {
        state.addWorkspace(modalName, modalEmoji);
      }
      return {
        modalName: "",
        modalEmoji: "",
        modalType: null,
        isListModalOpen: false,
        isWorkspaceModalOpen: false,
      };
    }),
}));
