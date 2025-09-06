
// src/components/Experience.tsx
import React, { useState } from "react";

const Experience = () => {
  const [form, setForm] = useState({
    empresa: "",
    cargo: "",
    periodoInicio: "",
    periodoFim: "",
    descricao: "",
    trabalhoAtual: false
      });
    
      const [dateError, setDateError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value,type,checked } = e.target;
    const newForm = {
        ...form,
        [name]: type === "checkbox" ? checked : value,
    };
    if(
        name == "periodoInicio" || 
        (name == "periodoFim" && !newForm.trabalhoAtual)

    ){
      if (
        newForm.periodoInicio &&
        newForm.periodoFim &&
        !newForm.trabalhoAtual &&
        newForm.periodoInicio > newForm.periodoFim
      ){
        setDateError("A data de início não pode ser maior que a data de fim.");
      }else{
        setDateError("");
      }
    }
    setForm(newForm);
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
        {/*checkbox atvB */} 
        <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="trabalhoAtual"
        checked={form.trabalhoAtual}
        onChange={handleChange}
        />
        <label htmlFor="trabalhoAtual">Trabalho Atual</label>
      </div>
        
      {/* desabilita o do campo periodoFim se trabalhoAtual estiver marcado */}
      
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
    </div>
  );
};

export default Experience;


