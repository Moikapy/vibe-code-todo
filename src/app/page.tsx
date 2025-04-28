"use client";

import { useEffect, useState } from "react";

interface Task {
  id: string;
  text: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      { id: Date.now().toString(), text: input.trim() },
      ...prev,
    ]);
    setInput("");
    // TODO: Add logic to save to a database here
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    // TODO: Add logic to remove from a database here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4" style={{
      backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
      backgroundBlendMode: 'multiply',
      backgroundColor: '#f5e9da',
    }}>
      <div className="w-full max-w-md card bg-base-100 shadow-lg border border-base-300/40 rounded-3xl p-6" style={{boxShadow: '0 4px 24px 0 #e2cfcf55'}}>
        <div className="card-body gap-4">
          <h1 className="card-title text-3xl font-extrabold justify-center mb-2 text-center" style={{ fontFamily: '"Indie Flower", cursive' }}>
            <span role="img" aria-label="lofi">☕</span> Cozy Lofi To-Do List
          </h1>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <input
              className="input input-bordered flex-1 bg-[#f5e9da] border-base-300 placeholder:text-base-content/40 focus:border-primary focus:ring-2 focus:ring-primary/30 text-base-content px-5 py-3 rounded-2xl"
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              style={{ fontFamily: 'inherit', background: 'rgba(245, 233, 218, 0.95)' }}
            />
            <button
              type="submit"
              className="btn rounded-full bg-[#e2cfcf] text-base-content border-none shadow hover:bg-[#e2cfcf]/80 transition"
              style={{ fontFamily: 'inherit' }}
            >
              <span role="img" aria-label="add">➕</span>
            </button>
          </form>
          <ul className="flex flex-col gap-2 mt-2 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
            {tasks.length === 0 && (
              <li className="alert bg-[#e2cfcf] text-base-content/70 border-none shadow-none text-center p-2 rounded-xl">No tasks yet. Take it easy ☁️</li>
            )}
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-[#f5e9da] rounded-xl px-3 py-2 group border border-base-300/40 shadow-sm"
                style={{ fontFamily: 'inherit' }}
              >
                <span className="flex-1 break-words text-lg" style={{ fontFamily: 'inherit' }}>{task.text}</span>
                <button
                  className="btn btn-xs btn-circle btn-ghost text-error opacity-0 group-hover:opacity-100 transition"
                  onClick={() => removeTask(task.id)}
                  aria-label="Remove task"
                  style={{ fontFamily: 'inherit' }}
                >
                  <span className="text-xl leading-none">🗑️</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="text-xs text-base-content/60 text-center mt-4" style={{ fontFamily: 'inherit' }}>
            Tasks are saved in your browser. <br />
            <span className="italic">(Database sync coming soon)</span>
          </div>
        </div>
      </div>
      {/* Google Fonts Indie Flower for cozy handwriting */}
      <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
    </div>
  );
}
