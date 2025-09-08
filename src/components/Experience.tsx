// src/components/Experience.tsx
import React, { useState } from "react";
import { useExperience } from "../context/ExperienceContext";

const Experience = () => {
  const { addExperience } = useExperience();

  const [form, setForm] = useState({
    empresa: "",
    cargo: "",
    periodoInicio: "",
    periodoFim: "",
    descricao: "",
    trabalhoAtual: false,
  });

  const [dateError, setDateError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    if (
      name === "periodoInicio" ||
      (name === "periodoFim" && !newForm.trabalhoAtual)
    ) {
      if (
        newForm.periodoInicio &&
        newForm.periodoFim &&
        !newForm.trabalhoAtual &&
        newForm.periodoInicio > newForm.periodoFim
      ) {
        setDateError("A data de início não pode ser maior que a data de fim.");
      } else {
        setDateError("");
      }
    }

    setForm(newForm);
  };

  // ✅ Função para salvar experiência no Context
  const handleSave = () => {
    if (!form.empresa || !form.cargo) {
      alert("Preencha pelo menos Empresa e Cargo.");
      return;
    }

    if (dateError) {
      alert("Corrija os erros de data antes de salvar.");
      return;
    }

    addExperience(form);

    // limpa o formulário após salvar
    setForm({
      empresa: "",
      cargo: "",
      periodoInicio: "",
      periodoFim: "",
      descricao: "",
      trabalhoAtual: false,
    });

    alert("Experiência salva com sucesso!");
  };

  return (
    <div className="p-4 border rounded-md space-y-3">
      <h2 className="text-lg font-semibold">Experiência</h2>

      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={form.empresa}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="cargo"
        placeholder="Cargo"
        value={form.cargo}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="date"
        name="periodoInicio"
        value={form.periodoInicio}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      {/* Checkbox trabalho atual */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="trabalhoAtual"
          checked={form.trabalhoAtual}
          onChange={handleChange}
        />
        <label htmlFor="trabalhoAtual">Trabalho Atual</label>
      </div>

      {/* Campo periodoFim desabilitado se trabalhoAtual estiver marcado */}
      <input
        type="date"
        name="periodoFim"
        value={form.periodoFim}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        disabled={form.trabalhoAtual}
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      {/* Exibe erro de data se houver */}
      {dateError && <p className="text-red-500 text-sm">{dateError}</p>}

      {/* ✅ Botão salvar */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Salvar Experiência
      </button>
    </div>
  );
};

export default Experience;
// src/hooks/useCVData.ts
import React, { createContext, useContext, useState } from "react";