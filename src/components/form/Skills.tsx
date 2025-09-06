import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCVData } from "../../hooks/useCVdata";

const Skills: React.FC = () => {
  const { skills, addSkill, removeSkill } = useCVData();

  const [name, setName] = useState("");
  const [level, setLevel] = useState<"Básico" | "Intermediário" | "Avançado">("Básico");

  const handleAddSkill = () => {
    if (!name.trim()) return;

    addSkill({
      id: uuidv4(),
      name,
      level,
    });

    setName("");
    setLevel("Básico");
  };

  return (
     
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
 {/* Título da página */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Habilidades
      </h1>

      <div className="w-full max-w-md rounded-xl shadow-2xl p-8 space-y-6">
        <input
          type="text"
          placeholder="Digite a habilidade..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border p-2 rounded"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>

       <button
          onClick={handleAddSkill}
          className="flex-1 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition"
        >
          Adicionar
        </button>
      </div>

      {/* Lista dinâmica */}
      <ul className=" flex flex-col items-center justify-center bg-gray-100 text-center">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {skill.name} — <em>{skill.level}</em>
            </span>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500 hover:underline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;