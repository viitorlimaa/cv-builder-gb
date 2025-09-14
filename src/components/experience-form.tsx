import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Building, Calendar, Plus, Trash2 } from "lucide-react";
import { AIEnhanceButton } from "./ai-enhance-button";
import { useTheme } from "../hooks/use-theme";
import { Experience } from "../@types/experience";
import { enhanceTextWithAI } from "../services/gemini";

export const experienceSchema = z
  .object({
    id: z.string(),
    company: z
      .string()
      .trim()
      .min(1, { message: "Empresa é obrigatória" })
      .max(50)
      .refine((val) => /^[\p{L}\d\s'.@-]+$/u.test(val), {
        message:
          "Entrada inválida. Apenas letras, números, espaços, e os caracteres '-.@' são permitidos.",
      }),
    position: z
      .string()
      .trim()
      .min(1, { message: "Cargo é obrigatório" })
      .refine((val) => /^[\p{L}\d\s'.@-]+$/u.test(val), {
        message:
          "Entrada inválida. Apenas letras, números, espaços, e os caracteres '-.@' são permitidos.",
      }),
    startDate: z.string().min(1, { message: "Data de início é obrigatória" }),
    endDate: z.string().optional(),
    isCurrentJob: z.boolean(),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isCurrentJob && !data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "Data de término é obrigatória",
      });
    }
    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "Data de término deve ser posterior à data de início",
      });
    }
  });

export const experienceFormSchema = z.object({
  experiences: z.array(experienceSchema),
});

type ExperienceFormData = z.infer<typeof experienceFormSchema>;

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  showToast: (message: string, type: "success" | "error") => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onChange,
  showToast,
}) => {
  const { isDark } = useTheme();

  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: { experiences },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  // CORREÇÃO 1: Adicionar o useEffect para sincronizar o estado com o componente pai
  useEffect(() => {
    const subscription = watch((value) => {
      // Usar 'value.experiences' para garantir que estamos observando a propriedade correta
      if (value.experiences) {
        onChange(value.experiences as Experience[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
    });
  };

  const handleAIEnhance = async (index: number) => {
    const currentText = watch(`experiences.${index}.description`) || "";
    if (!currentText.trim()) {
      showToast("Não há descrição para aprimorar.", "error");
      return;
    }
    try {
      const enhancedText = await enhanceTextWithAI(
        currentText,
        "experience-description"
      );
      setValue(`experiences.${index}.description`, enhancedText, {
        shouldValidate: true,
        shouldDirty: true,
      });
      showToast("Descrição melhorada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao aprimorar descrição com IA:", error);
      showToast("Falha ao aprimorar descrição. Tente novamente.", "error");
    }
  };

  return (
    <div
      className={`section-card ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2
          className={`text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Experiências Profissionais
        </h2>
        <button
          type="button"
          onClick={addExperience}
          className="btn-primary w-full sm:w-auto"
        >
          <Plus size={16} className="mr-1" />
          Adicionar
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => {
          const isCurrentJob = watch(`experiences.${index}.isCurrentJob`);
          const descriptionValue =
            watch(`experiences.${index}.description`) || "";

          return (
            <div
              key={field.id}
              className={`p-4 border rounded-lg ${
                isDark
                  ? "border-gray-600 bg-gray-750"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3
                  className={`font-medium ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Experiência {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* ... O resto do seu JSX permanece o mesmo ... */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Empresa *
                  </label>
                  <div className="relative">
                    <Building
                      size={18}
                      className={`absolute left-3 top-2.5 text-gray-400`}
                    />
                    <input
                      type="text"
                      maxLength={40}
                      {...register(`experiences.${index}.company`)}
                      className={`input-field pl-10 ${
                        errors.experiences?.[index]?.company
                          ? "border-red-500"
                          : ""
                      } ${isDark ? "bg-gray-700" : "bg-white"}`}
                      placeholder="Nome da empresa"
                    />
                  </div>
                  {errors.experiences?.[index]?.company && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experiences?.[index]?.company?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Cargo *
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    {...register(`experiences.${index}.position`)}
                    className={`input-field ${
                      errors.experiences?.[index]?.position
                        ? "border-red-500"
                        : ""
                    } ${isDark ? "bg-gray-700" : "bg-white"}`}
                    placeholder="Seu cargo"
                  />
                  {errors.experiences?.[index]?.position && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experiences?.[index]?.position?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Data de Início *
                  </label>
                  <div className="relative">
                    <Calendar
                      size={18}
                      className={`absolute left-3 top-2.5 text-gray-400`}
                    />
                    <input
                      type="month"
                      {...register(`experiences.${index}.startDate`)}
                      className={`input-field pl-10 ${
                        errors.experiences?.[index]?.startDate
                          ? "border-red-500"
                          : ""
                      } ${isDark ? "bg-gray-700" : "bg-white"}`}
                    />
                  </div>
                  {errors.experiences?.[index]?.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experiences?.[index]?.startDate?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Data de Término {!isCurrentJob && "*"}
                  </label>
                  <div className="relative">
                    <Calendar
                      size={18}
                      className={`absolute left-3 top-2.5 text-gray-400`}
                    />
                    <input
                      type="month"
                      {...register(`experiences.${index}.endDate`)}
                      className={`input-field pl-10 ${
                        errors.experiences?.[index]?.endDate
                          ? "border-red-500"
                          : ""
                      } ${isDark ? "bg-gray-700" : "bg-white"}`}
                      disabled={isCurrentJob}
                    />
                  </div>
                  {errors.experiences?.[index]?.endDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experiences?.[index]?.endDate?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(`experiences.${index}.isCurrentJob`, {
                      onChange: (e) => {
                        if (e.target.checked) {
                          setValue(`experiences.${index}.endDate`, "");
                        }
                      },
                    })}
                    className="rounded"
                  />
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Trabalho atual
                  </span>
                </label>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    className={`block text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Descrição das Atividades
                  </label>
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {descriptionValue.length}/500
                  </span>
                </div>
                <textarea
                  maxLength={500}
                  {...register(`experiences.${index}.description`)}
                  className={`input-field h-20 resize-none ${
                    isDark ? "bg-gray-700" : "bg-white"
                  }`}
                  placeholder="Descreva suas principais responsabilidades e conquistas..."
                />
                <div className="mt-2">
                  <AIEnhanceButton
                    text={descriptionValue}
                    type="experience"
                    onEnhance={() => handleAIEnhance(index)}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div
            className={`text-center py-8 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Building size={48} className="mx-auto mb-2 opacity-50" />
            <p>Nenhuma experiência adicionada ainda.</p>
            <p className="text-sm">Clique em "Adicionar" para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};
