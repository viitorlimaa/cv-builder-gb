import { useLocalStorage } from "./useLocalStorage";
import type { PersonalInfo, Skill } from "../types/cv.types";

export function useCVData() {
  const [cvData, setCVData] = useLocalStorage("cv-data", {
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
    } as PersonalInfo,
    skills: [] as Skill[],
  });

  const updateSkills = (skills: Skill[]) => {
    setCVData({ ...cvData, skills });
  };

  return {
    cvData,
    setCVData,
    updateSkills,
  };
}
