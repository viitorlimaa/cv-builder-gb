import { useState } from "react";
import { useCVData } from "../../hooks/useCVdata";
import type { Skill } from "../../types/cv.types";
import { v4 as uuidv4 } from "uuid";

export function Skills() {
  const { cvData, updateSkills } = useCVData();
  const [newSkill, setNewSkill] = useState("");
  const [level, setLevel] = useState<Skill["level"]>("Básico");

  const handleAdd = () => {
    if (!newSkill.trim()) return;
    const skill: Skill = { id: uuidv4(), name: newSkill.trim(), level };
    updateSkills([...cvData.skills, skill]);
    setNewSkill("");
    setLevel("Básico");
  };

  const handleRemove = (id: string) => {
    updateSkills(cvData.skills.filter((skill) => skill.id !== id));
  };

  return (
    <div
      className="w-full max-w-md mx-auto rounded-xl shadow-lg p-6 space-y-6"
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text)" }}
    >
      <h2 className="text-xl font-semibold">Gerenciamento de Habilidades</h2>

      <ul className="space-y-2">
        {cvData.skills.map((skill) => (
          <li
            key={skill.id}
            className="flex justify-between items-center px-3 py-2 rounded-md"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <span>
              {skill.name} —{" "}
              <span className="text-sm opacity-70">{skill.level}</span>
            </span>
            <button
              onClick={() => handleRemove(skill.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nome da habilidade"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{
            backgroundColor: "var(--bg)",
            color: "var(--text)",
          }}
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as Skill["level"])}
          className="border rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          style={{
            backgroundColor: "var(--bg)",
            color: "var(--text)",
          }}
        >
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
