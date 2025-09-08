// src/components/Experience.tsx;
import React, { useState } from "react";
import { useExperience } from "../context/ExperienceContext";
import toast from "react-hot-toast";

const Experience = () => {
  const { experiences, addExperience, undo, redo, canUndo, canRedo } = useExperience();

  const [form, setForm] = useState({
    empresa: "",
    cargo: "",
    periodoInicio: "",
    periodoFim: "",
    descricao: "",
    trabalhoAtual: false,
  });

  const [dateError, setDateError] = useState("");

  // ✅ Atualiza os campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newForm = { ...form, [name]: type === "checkbox" ? checked : value };

    // Validação de datas
    if (name === "periodoInicio" || (name === "periodoFim" && !newForm.trabalhoAtual)) {
      if (
        newForm.periodoInicio &&
        newForm.periodoFim &&
        !newForm.trabalhoAtual &&
        newForm.periodoInicio > newForm.periodoFim
      ) {
        setDateError("A data de início não pode ser maior que a data
