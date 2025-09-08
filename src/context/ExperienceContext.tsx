import React, { createContext, useContext, useState } from "react";

export interface Experience {
  id: string;
  empresa: string;
  cargo: string;
  periodoInicio: string;
  periodoFim: string;
  descricao: string;
  trabalhoAtual: boolean;
}

interface ExperienceContextType {
  experiences: Experience[];
  addExperience: (exp: Omit<Experience, "id">) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(
  undefined
);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [past, setPast] = useState<Experience[][]>([]);
  const [present, setPresent] = useState<Experience[]>([]);
  const [future, setFuture] = useState<Experience[][]>([]);

  const addExperience = (exp: Omit<Experience, "id">) => {
    const newExp: Experience = { ...exp, id: Date.now().toString() };

    setPast([...past, present]);
    setPresent([...present, newExp]);
    setFuture([]);
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast(past.slice(0, past.length - 1));
    setFuture([present, ...future]);
    setPresent(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture(future.slice(1));
    setPast([...past, present]);
    setPresent(next);
  };

  return (
    <ExperienceContext.Provider
      value={{
        experiences: present,
        addExperience,
        undo,
        redo,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience deve ser usado dentro de um ExperienceProvider");
  }
  return context;
};
