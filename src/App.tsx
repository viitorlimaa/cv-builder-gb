// src/App.tsx
import React from "react";
import Experience from "./components/Experience";
import { ExperienceProvider } from "./context/ExperienceContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ExperienceProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Meu CV</h1>
        <Experience />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </ExperienceProvider>
  );
}

export default App;

