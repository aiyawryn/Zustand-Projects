import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";
import Modal from "./components/Modal";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <MainArea />
        <TodoList />
      </div>
      <Modal />
    </div>
  );
};

export default App;
