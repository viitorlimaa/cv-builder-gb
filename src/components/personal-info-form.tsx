import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { Linkedin, Mail, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

import { AIEnhanceButton } from "./ai-enhance-button";
import { useTheme } from "../hooks/use-theme";
import { PersonalInfo } from "../@types/personal-info";
import { enhanceTextWithAI } from "../services/gemini";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(50)
    .refine((val) => /^[\p{L}\s'-]+$/u.test(val), {
      message: "Nome inválido. Apenas letras, espaços e '- são permitidos.",
    }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  phone: z
    .string()
    .max(50)
    .optional()
    .refine((val) => !val || /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(val), {
      message: "Formato: (11) 99999-9999",
    }),
  linkedin: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(val),
      {
        message: "URL do LinkedIn inválida",
      }
    ),
  summary: z
    .string()
    .max(500, { message: "O resumo não pode exceder 500 caracteres" })
    .optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  showToast: (message: string, type: "success" | "error") => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  showToast,
}) => {
  const { isDark } = useTheme();

  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
    mode: "onBlur",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as PersonalInfo);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const summaryValue = watch("summary") || "";

  const handleAIEnhance = async (currentText: string) => {
    if (!currentText.trim()) {
      showToast("Não há texto para aprimorar.", "error");
      return;
    }
    try {
      const enhancedText = await enhanceTextWithAI(
        currentText,
        "personal-summary"
      );
      setValue("summary", enhancedText, {
        shouldValidate: true,
        shouldDirty: true,
      });
      showToast("Resumo melhorado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao aprimorar resumo com IA:", error);
      showToast("Falha ao aprimorar resumo. Tente novamente.", "error");
    } finally {
      return;
    }
  };

  return (
    <div
      className={`section-card ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <User size={20} />
        Dados Pessoais
      </h2>

      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Nome Completo *
          </label>
          <input
            type="text"
            maxLength={50}
            {...register("name")}
            className={`input-field ${errors.name ? "border-red-500" : ""} ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Seu nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Email *
          </label>
          <div className="relative">
            <Mail
              size={18}
              className={`absolute left-3 top-2.5 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <input
              type="email"
              {...register("email")}
              className={`input-field pl-10 ${
                errors.email ? "border-red-500" : ""
              } ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="seu@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Telefone
          </label>
          <div className="relative">
            <Phone
              size={18}
              className={`absolute left-3 top-2.5 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <IMaskInput
                  mask="(00) 00000-0000"
                  value={value || ""}
                  onAccept={(value) => onChange(value)}
                  onBlur={onBlur}
                  inputRef={ref}
                  className={`input-field pl-10 ${
                    errors.phone ? "border-red-500" : ""
                  } ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="(11) 99999-9999"
                />
              )}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-1 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            LinkedIn
          </label>
          <div className="relative">
            <Linkedin
              size={18}
              className={`absolute left-3 top-2.5 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <input
              type="url"
              maxLength={50}
              {...register("linkedin")}
              className={`input-field pl-10 ${
                errors.linkedin ? "border-red-500" : ""
              } ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              placeholder="https://linkedin.com/in/seuperfil"
            />
          </div>
          {errors.linkedin && (
            <p className="text-red-500 text-xs mt-1">
              {errors.linkedin.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Resumo Profissional
            </label>
            <span
              className={`text-xs ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {summaryValue.length}/500
            </span>
          </div>
          <textarea
            {...register("summary")}
            className={`input-field h-24 resize-none ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
            maxLength={500}
          />
          <div className="mt-2">
            <AIEnhanceButton
              text={summaryValue}
              type="summary"
              onEnhance={handleAIEnhance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
