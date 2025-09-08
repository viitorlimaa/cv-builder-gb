// src/App.tsx
import React from "react";
import { ExperienceProvider } from "./context/ExperienceContext";
import Experience from "./components/Experience";
import ExperienceList from "./components/ExperienceList";
import DebugCV from "./components/DebugCV";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ExperienceProvider>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Meu CV</h1>

        <Experience />

        <ExperienceList />

        <DebugCV />

        <Toaster position="top-right" />
      </div>
    </ExperienceProvider>
  );
}

export default App;
