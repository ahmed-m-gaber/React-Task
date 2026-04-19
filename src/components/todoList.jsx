import React, { useState } from "react";

const InputFiled = ({ addTasks }) => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (task == "") {
      setError("task can't be empty");
      return false;
    }
    if (task.length < 3) {
      setError("task can't be less than 3 char");
      return false;
    }
    setError("");
    return true;
  }

  const handleClick = () => {
    if (validate()) {
      addTasks(task);
      setTask("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex gap-2">
        <input 
          className="flex-1 p-3 border rounded-xl outline-none focus:border-indigo-500 transition-all"
          value={task} 
          placeholder="New task..."
          onChange={(e) => {
            setTask(e.target.value)
            error && validate()
          }} 
          type="text" 
        />
        <button 
          className={`px-6 py-3 rounded-xl font-bold text-white transition-all ${error ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          onClick={handleClick} 
          disabled={Boolean(error)} 
        >
          Create
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
    </div>
  );
};

const ViewTasks = ({ tasks, deleteTask }) => {
  if (tasks.length == 0) return <p className="text-center text-slate-400 mt-6">Create a new task</p>
  return (
    <div className="mt-8 space-y-3">
      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{tasks.length} Tasks Total</p>
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
          <span className="text-slate-700 font-medium">{task.title}</span>
          <button 
            className="text-red-400 hover:text-red-600 font-bold text-sm"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const addTasks = (task) => {
    setTasks([...tasks, { title: task, id: Date.now() }]);
  };
  return (
    <div className="max-w-md mx-auto">
      <InputFiled addTasks={addTasks} />
      <ViewTasks tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default TodoList;