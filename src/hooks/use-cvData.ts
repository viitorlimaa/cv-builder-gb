import { useLocalStorage } from "./useLocalStorage";
import type { PersonalInfo, Skill } from "../types/cv.types";
import { useState, useCallback } from "react";

export type ExperienceData = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
};

export type CVData = {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: ExperienceData[];
};

export function useCVData() {
  const [cvData, setCVData] = useLocalStorage<CVData>("cv-data", {
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
    } as PersonalInfo,
    skills: [],
    experiences: [],
  });

  const [history, setHistory] = useState<CVData[]>([cvData]);
  const [index, setIndex] = useState(0);

  const updateCV = useCallback(
    (newData: CVData) => {
      const newHistory = history.slice(0, index + 1);
      newHistory.push(newData);
      setHistory(newHistory);
      setIndex(newHistory.length - 1);
      setCVData(newData);
    },
    [history, index, setCVData]
  );

  const updateSkills = (skills: Skill[]) => {
    const newData = { ...cvData, skills };
    updateCV(newData);
  };

  const updateExperiences = (experiences: ExperienceData[]) => {
    const newData = { ...cvData, experiences };
    updateCV(newData);
  };

  const undo = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setCVData(history[newIndex]);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setCVData(history[newIndex]);
    }
  };

  return {
    cvData,
    setCVData,
    updateSkills,
    updateExperiences,
    undo,
    redo,
  };
}


