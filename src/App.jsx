import React, { useState } from "react";
// Ensure these paths match your folder structure exactly
import TodoList from "./components/todoList";
import UserForm from "./components/userForm";
import DebounceSearch from "./components/debounceSearch";
import CharCounter from "./components/charCounter";

function App() {
  // 1. State to manage which tool is currently visible
  const [activeTab, setActiveTab] = useState("todo");

  // 2. Tab configuration for the navigation bar
  const tabs = [
    { id: "todo", label: "Tasks", icon: "✅" },
    { id: "user", label: "Users", icon: "👤" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "counter", label: "Counter", icon: "✍️" },
  ];

  // 3. Logic to switch between components
  const renderComponent = () => {
    switch (activeTab) {
      case "todo":
        return <TodoList />;
      case "user":
        return <UserForm />;
      case "search":
        return <DebounceSearch />;
      case "counter":
        return <CharCounter />;
      default:
        return <TodoList />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-indigo-600 shadow-md ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- CONTENT SECTION --- */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        {/* Container for the active component */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-2 min-h-100px">
          <div key={activeTab} className="p-4 transition-opacity duration-300">
             {renderComponent()}
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
          React Component Lab • 2024
        </p>
      </footer>
    </div>
  );
}

export default App;