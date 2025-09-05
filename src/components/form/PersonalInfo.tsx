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
        setInfo(imported);
      } catch {
        alert("Arquivo JSON inválido!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dados Pessoais</h2>

      {["name", "email", "phone", "linkedin"].map((field) => (
        <div key={field}>
          <input
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={info[field as keyof PersonalInfo]}
            onChange={(e) =>
              handleChange(field as keyof PersonalInfo, e.target.value)
            }
            className={`w-full rounded-md border p-2 ${
              errors[field as keyof PersonalInfo]
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors[field as keyof PersonalInfo] && (
            <p className="text-sm text-red-500">
              {errors[field as keyof PersonalInfo]}
            </p>
          )}
        </div>
      ))}

      <div>
        <textarea
          placeholder="Resumo Profissional"
          value={info.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          className={`w-full rounded-md border p-2 h-32 resize-none ${
            errors.summary ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div className="flex justify-between text-sm">
          <span>
            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
          </span>
          <span>
            {info.summary.length}/{MAX_SUMMARY_LENGTH}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="rounded-md bg-blue-600 px-3 py-1 text-white"
        >
          Exportar JSON
        </button>
        <label className="cursor-pointer rounded-md bg-gray-600 px-3 py-1 text-white">
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
  );
}
