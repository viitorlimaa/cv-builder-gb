import React, { createContext, useContext, useState } from "react";

// Defina o tipo dos dados do CV
type CVData = {
  empresa: string;
  cargo: string;
  periodoInicio: string;
  periodoFim: string;
  descricao: string;
  trabalhoAtual: boolean;
};

// Crie o contexto
const CVDataContext = createContext<{
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
} | undefined>(undefined);

// Crie o provider
export const CVDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCVData] = useState<CVData>({
    empresa: "",
    cargo: "",
    periodoInicio: "",
    periodoFim: "",
    descricao: "",
    trabalhoAtual: false,
  });

  return (
    <CVDataContext.Provider value={{ cvData, setCVData }}>
      {children}
    </CVDataContext.Provider>
  );
};

// Hook para usar o contexto
export function useCVData() {
  const context = useContext(CVDataContext);
  if (!context) {
    throw new Error("useCVData deve ser usado dentro de um CVDataProvider");
  }
  return context;
}