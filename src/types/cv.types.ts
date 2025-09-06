export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
};

export interface Skill {
  id: string;
  name: string;
  level: "Básico"|"Intermediário"|"Avançado" 
}