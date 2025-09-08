// src/components/ExperienceList.tsx
import React from "react";
import { useExperience } from "../context/ExperienceContext";
import toast from "react-hot-toast";

export default function ExperienceList() {
  const { experiences, removeExperience } = useExperience();

  if (!experiences || experiences.length === 0) {
    return <p className="mt-4">Nenhuma experiência salva.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-lg font-semibold">Experiências salvas</h3>

      {experiences.map((e) => (
        <div key={e.id} className="p-3 bg-white rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <strong>{e.cargo}</strong> — {e.empresa}
              <div>
                <small>
                  {e.periodoInicio} — {e.trabalhoAtual ? "Atualmente" : e.periodoFim || "—"}
                </small>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => {
                  removeExperience(e.id);
                  toast.success("Experiência removida");
                }}
              >
                Remover
              </button>
            </div>
          </div>

          {e.descricao && <p className="mt-2 text-sm">{e.descricao}</p>}
        </div>
      ))}
    </div>
  );
}
