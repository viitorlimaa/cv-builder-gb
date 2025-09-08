export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
};

export type Skill = {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
};
