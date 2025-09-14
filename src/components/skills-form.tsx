import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Skill } from "../@types/skill";
import { useTheme } from "../hooks/use-theme";
import { Plus, Trash2 } from "lucide-react";

export const skillSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome da habilidade é obrigatório" })
    .max(50)
    .refine((val) => /^[\p{L}\s'.@-]+$/u.test(val), {
      message:
        "Nome inválido. Apenas letras, espaços, e os caracteres '-.@' são permitidos.",
    }),
  level: z.enum(["Básico", "Intermediário", "Avançado"]),
});

export const skillsFormSchema = z.object({
  skills: z.array(skillSchema),
});

type SkillsFormData = z.infer<typeof skillsFormSchema>;

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const { isDark } = useTheme();

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: { skills: skills },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.skills) {
        onChange(value.skills as Skill[]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const [newSkill, setNewSkill] = useState<{
    name: string;
    level: Skill["level"];
  }>({
    name: "",
    level: "Básico",
  });
  const [error, setError] = useState("");

  const addSkill = () => {
    const result = skillSchema
      .pick({ name: true, level: true })
      .safeParse(newSkill);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    append({
      id: Date.now().toString(),
      name: result.data.name,
      level: result.data.level,
    });

    setNewSkill({ name: "", level: "Básico" });
    setError("");
  };

  return (
    <div
      className={`section-card ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Habilidades
      </h2>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
          >
            <div className="flex-1 w-full">
              <input
                type="text"
                maxLength={50}
                {...register(`skills.${index}.name`)}
                className={`input-field flex-1 w-full ${
                  errors.skills?.[index]?.name ? "border-red-500" : ""
                } ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Nome da habilidade"
              />
              {errors.skills?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.skills?.[index]?.name?.message}
                </p>
              )}
            </div>
            <select
              {...register(`skills.${index}.level`)}
              className={`input-field w-full sm:w-32 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <button onClick={() => remove(index)} className="btn-danger">
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <div
          className={`flex flex-col sm:flex-row gap-2 items-start sm:items-center pt-2 border-t ${
            isDark ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => {
              setNewSkill({ ...newSkill, name: e.target.value });
              if (error) setError("");
            }}
            className={`input-field flex-1 ${error ? "border-red-500" : ""} ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Nova habilidade"
            onKeyPress={(e) => e.key === "Enter" && addSkill()}
          />
          <select
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({
                ...newSkill,
                level: e.target.value as Skill["level"],
              })
            }
            className={`input-field w-full sm:w-32 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button onClick={addSkill} className="btn-primary w-full sm:w-auto">
            <Plus size={16} />
            <span className="sm:hidden ml-2">Adicionar</span>
          </button>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
};
