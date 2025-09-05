import { useState } from "react";
import type { PersonalInfo } from "../../types/cv.types";
import {
  validateName,
  validateEmail,
  validateLinkedin,
  validatePhone,
  validateSummary,
} from "../../utils/validation";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const MAX_SUMMARY_LENGTH = 500;

export function PersonalInfo() {
  const [info, setInfo] = useLocalStorage<PersonalInfo>("cv-personal-info", {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const newInfo = { ...info, [field]: value };
    setInfo(newInfo);

    let error = "";
    switch (field) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "linkedin":
        error = validateLinkedin(value);
        break;
      case "summary":
        error = validateSummary(value, MAX_SUMMARY_LENGTH);
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(info, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-personal-info.json";
    a.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setInfo(imported);
      } catch {
        alert("Arquivo JSON inválido!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      {/* Título da página */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Cadastro Pessoal
      </h1>

      {/* Card do formulário */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Campos Nome, Email, Telefone, LinkedIn */}
        {["nome", "e-mail", "telefone", "linkedIn"].map((field) => (
          <div key={field} className="space-y-1">
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={info[field as keyof PersonalInfo]}
              onChange={(e) =>
                handleChange(field as keyof PersonalInfo, e.target.value)
              }
              className={`w-full rounded-md bg-gray-50 border border-gray-300 px-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field as keyof PersonalInfo] ? "border-red-500" : ""
              }`}
            />
            {errors[field as keyof PersonalInfo] && (
              <p className="text-sm text-red-500">{errors[field as keyof PersonalInfo]}</p>
            )}
          </div>
        ))}

        {/* Resumo Profissional */}
        <div className="space-y-1">
          <textarea
            placeholder="Resumo Profissional"
            value={info.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            rows={4}
            className={`w-full rounded-md bg-gray-50 border border-gray-300 px-3 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.summary ? "border-red-500" : ""
            }`}
          />
          <div className="flex justify-between text-xs text-gray-500">
            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
            <span>
              {info.summary.length}/{MAX_SUMMARY_LENGTH}
            </span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 transition cursor-pointer"
          >
            Exportar JSON
          </button>
          <label className="flex-1 cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white text-center hover:bg-blue-500 transition">
            Importar JSON
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              hidden
            />
          </label>
        </div>
      </div>
    </div>
  );
}
