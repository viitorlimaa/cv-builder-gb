"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Sparkles, Moon, Sun, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ThemeContext } from "./hooks/use-theme";
import { PersonalInfoForm } from "./components/personal-info-form";
import { PersonalInfo } from "./@types/personal-info";
import { Toast } from "./@types/toast";
import { SkillsForm } from "./components/skills-form";
import { ToastContainer } from "./components/toast-container";
import { Skill } from "./@types/skill";
import { CVData } from "./@types/cv-data";
import { Experience } from "./@types/experience";
import { CVPreview } from "./components/cv-preview";
import { ExperienceForm } from "./components/experience-form";

import { z } from "zod";
import { personalInfoSchema } from "./components/personal-info-form";
import { skillsFormSchema } from "./components/skills-form";
import { experienceFormSchema } from "./components/experience-form";

const cvDataSchema = z.object({
  personalInfo: personalInfoSchema,
  skills: skillsFormSchema.shape.skills,
  experiences: experienceFormSchema.shape.experiences,
});

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("cvBuilderTheme");
    return saved ? JSON.parse(saved) : false;
  });

  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const toggleTheme = useCallback(() => {
    setIsDark((prev: boolean) => {
      const newTheme = !prev;
      localStorage.setItem("cvBuilderTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  }, []);

  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
    },
    skills: [],
    experiences: [],
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Date.now().toString();
      const toast: Toast = { id, message, type };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleExportPdf = async () => {
    const validationResult = cvDataSchema.safeParse(cvData);

    if (!validationResult.success) {
      console.error(
        "Erros de validação:",
        validationResult.error.flatten().fieldErrors
      );
      showToast(
        "Por favor, preencha todos os campos obrigatórios antes de exportar.",
        "error"
      );
      return;
    }

    const element = previewRef.current;
    if (!element) {
      showToast(
        "Erro: Não foi possível encontrar o elemento para exportar.",
        "error"
      );
      return;
    }

    setIsExporting(true);
    showToast("Gerando PDF...", "info");

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `cv-${cvData.personalInfo.name.replace(/\s/g, "_") || "preview"}.pdf`
      );

      showToast("PDF exportado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      showToast("Falha ao gerar o PDF. Tente novamente.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const updatePersonalInfo = useCallback((personalInfo: PersonalInfo) => {
    setCvData((prev) => ({ ...prev, personalInfo }));
  }, []);

  const updateSkills = useCallback((skills: Skill[]) => {
    setCvData((prev) => ({ ...prev, skills }));
  }, []);

  const updateExperiences = useCallback((experiences: Experience[]) => {
    setCvData((prev) => ({ ...prev, experiences }));
  }, []);

  // ✅ NOVO: Limpar CVPreview no reload da página
  useEffect(() => {
    localStorage.removeItem("cvBuilderData"); // remove apenas os dados do CV
    setCvData({
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        summary: "",
      },
      skills: [],
      experiences: [],
    });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cvBuilderData");
    if (saved) {
      try {
        setCvData(JSON.parse(saved));
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cvBuilderData", JSON.stringify(cvData));
  }, [cvData]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-200 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <header
          className={`shadow-sm border-b transition-colors duration-200 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isDark ? "bg-blue-600" : "bg-primary-600"
                  }`}
                >
                  <Sparkles size={20} className="text-white" />
                </div>
                <h1
                  className={`text-xl sm:text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  CV Builder AI
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleExportPdf}
                  disabled={isExporting}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-800"
                      : "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-400"
                  } disabled:cursor-not-allowed`}
                >
                  <Download size={16} />
                  {isExporting ? "Exportando..." : "Exportar PDF"}
                </button>
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  aria-label="Alternar tema"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-2 sm:p-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 min-h-[calc(100vh-120px)]">
            <div className="overflow-y-auto pr-0 xl:pr-2 space-y-4 sm:space-y-6 max-h-[calc(100vh-140px)]">
              <PersonalInfoForm
                data={cvData.personalInfo}
                onChange={updatePersonalInfo}
                showToast={showToast}
              />
              <SkillsForm skills={cvData.skills} onChange={updateSkills} />
              <ExperienceForm
                experiences={cvData.experiences}
                onChange={updateExperiences}
                showToast={showToast}
              />
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-140px)]">
              <div className="sticky top-0">
                <CVPreview ref={previewRef} data={cvData} />
              </div>
            </div>
          </div>
        </div>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;