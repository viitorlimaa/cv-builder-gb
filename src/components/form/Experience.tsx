import { useState } from "react";
import { type ExperienceData, useCVData } from "../../hooks/use-cvData";
import Toast from "../ui/Toast";

export function ExperienceForm() {
  const { cvData, updateExperiences, undo, redo } = useCVData();
  const [experience, setExperience] = useState<ExperienceData>({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof ExperienceData,
    value: string | boolean
  ) => {
    setExperience((prev) => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    if (!experience.company || !experience.role || !experience.startDate) {
      setToastMessage("Preencha os campos obrigatórios!");
      return;
    }
    if (
      !experience.current &&
      experience.endDate &&
      experience.endDate < experience.startDate
    ) {
      setToastMessage(
        "A data de término não pode ser anterior à data de início."
      );
      return;
    }

    const updated = [...cvData.experiences, experience];
    updateExperiences(updated);
    setExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setToastMessage("Experiência adicionada!");
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Adicionar Experiência</h2>

      <input
        type="text"
        placeholder="Empresa"
        value={experience.company}
        onChange={(e) => handleChange("company", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Cargo"
        value={experience.role}
        onChange={(e) => handleChange("role", e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={experience.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="w-1/2 border rounded px-3 py-2"
        />
        <input
          type="date"
          value={experience.endDate}
          disabled={experience.current}
          onChange={(e) => handleChange("endDate", e.target.value)}
          className="w-1/2 border rounded px-3 py-2"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={experience.current}
          onChange={(e) => handleChange("current", e.target.checked)}
        />
        Trabalho Atual
      </label>

      <textarea
        placeholder="Descrição"
        value={experience.description}
        onChange={(e) => handleChange("description", e.target.value)}
        className="w-full border rounded px-3 py-2 resize-none"
        rows={3}
      />

      <div className="flex gap-2">
        <button
          onClick={addExperience}
          className="flex-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 transition"
        >
          Adicionar
        </button>
        <button
          onClick={() => {
            undo();
            setToastMessage("Undo realizado!");
          }}
          className="flex-1 bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition"
        >
          Undo
        </button>
        <button
          onClick={() => {
            redo();
            setToastMessage("Redo realizado!");
          }}
          className="flex-1 bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition"
        >
          Redo
        </button>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type="info"
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
