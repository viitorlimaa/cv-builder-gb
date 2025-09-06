import { useState } from "react";
import type { Skill } from "../types/cv.types";

export type UseCVDataReturn = {
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
};

export function useCVData(): UseCVDataReturn {
  const [skills, setSkills] = useState<Skill[]>([]);

  const addSkill = (skill: Skill) => {
    setSkills((prev) => [...prev, skill]);
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    skills,
    addSkill,
    removeSkill,
  };
}
