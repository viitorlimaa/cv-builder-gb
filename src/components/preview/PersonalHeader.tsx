import type { PersonalInfo } from "../../types/cv.types";

export function PersonalHeader({ info }: { info: PersonalInfo }) {
  return (
    <header className="border-b pb-4 space-y-1">
      <h1 className="text-3xl font-bold">
        {info.name || "Seu Nome Aqui"}
      </h1>
      <p className="text-gray-600">
        {info.email || "seuemail@exemplo.com"} • {info.phone || "(00) 0000-0000"}
      </p>
      <p className="text-blue-600">
        {info.linkedin || "linkedin.com/in/seu-perfil"}
      </p>
      <p className="text-gray-700 italic">
        {info.summary || "Resumo profissional aparecerá aqui..."}
      </p>
    </header>
  );
}
