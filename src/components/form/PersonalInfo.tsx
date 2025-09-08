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

  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalInfo, string>>
  >({});

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    // Bloqueia valores inválidos durante a digitação
    switch (field) {
      case "phone":
        if (!/^[0-9]*$/.test(value)) return;
        break;
      case "linkedin":
        if (value && !value.startsWith("https://linkedin.com/")) {
          // deixa digitar, mas validará
        }
        break;
      default:
        break;
    }

    const newInfo = { ...info, [field]: value };
    setInfo(newInfo);

    // Validação em tempo real
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
    if (Object.values(errors).some((e) => e)) {
      alert("Corrija os erros antes de exportar!");
      return;
    }

    const blob = new Blob([JSON.stringify(info, null, 2)], {
      type: "application/json",
    });
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
        // Filtra apenas campos válidos
        const filtered: PersonalInfo = {
          name: imported.name || "",
          email: imported.email || "",
          phone: imported.phone || "",
          linkedin: imported.linkedin || "",
          summary: imported.summary || "",
        };
        setInfo(filtered);
      } catch {
        alert("Arquivo JSON inválido!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Título da página */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Cadastro Pessoal
      </h1>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
        {/* Inputs Nome, Email, Telefone, LinkedIn */}
        {["name", "email", "phone", "linkedin"].map((field) => (
          <div key={field} className="space-y-1">
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={info[field as keyof PersonalInfo]}
              onChange={(e) =>
                handleChange(field as keyof PersonalInfo, e.target.value)
              }
              className={`w-full rounded-md border border-gray-300 px-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            className={`w-full rounded-md border border-gray-300 px-3 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.summary ? "border-red-500" : ""
            }`}
          />
          <div className="flex justify-between text-xs text-gray-500">
            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
            <span>{info.summary.length}/{MAX_SUMMARY_LENGTH}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition"
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
