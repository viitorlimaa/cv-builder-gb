
interface ExperienceContextType {
  experiences: Experience[];
  addExperience: (exp: Experience) => void;
}
import React, { createContext, useContext, useState } from "react";

export interface Experience {
  empresa: string;
  cargo: string;
  periodoInicio: string;
  periodoFim: string;
  descricao: string;
  trabalhoAtual: boolean;
}

interface ExperienceContextType {
  experiences: Experience[];
  addExperience: (exp: Experience) => void;
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
  // Histórico de estados
  const [past, setPast] = useState<Experience[][]>([]);
  const [present, setPresent] = useState<Experience[]>([]);
  const [future, setFuture] = useState<Experience[][]>([]);

  const addExperience = (exp: Experience) => {
    setPast([...past, present]); // adiciona o estado atual ao histórico passado
    setPresent([...present, exp]); // atualiza o estado atual
    setFuture([]); // limpa o futuro (não podemos refazer depois de uma nova ação)
  };

  const undo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
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

// Hook para usar o contexto
export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("useExperience deve ser usado dentro do Provider");
  return context;
};
