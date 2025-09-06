import React from "react";
import type { Skill } from "../../types/cv.types";
import { useCVData } from "../../hooks/useCVdata";

const SkillsSection: React.FC = () => {
  const { skills } = useCVData();

  if (!skills || skills.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="text-xl font-bold mb-2">Habilidades</h3>
      <ul className="list-disc pl-5 space-y-1">
        {skills.map((skill: Skill) => (
          <li key={skill.id}>
            {skill.name} — <span className="italic">{skill.level}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkillsSection;