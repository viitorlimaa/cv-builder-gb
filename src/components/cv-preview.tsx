import React, { forwardRef } from "react";
import { Linkedin, Mail, Phone, User } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { CVData } from "../@types/cv-data";

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }, ref) => {
    const { isDark } = useTheme();

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const [year, month] = dateString.split("-");
      const months = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const monthIndex = Number.parseInt(month, 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${months[monthIndex]} ${year}`;
      }
      return dateString;
    };

    const getLevelColor = (level: string) => {
      switch (level) {
        case "Básico":
          return "bg-yellow-200 text-yellow-800";
        case "Intermediário":
          return "bg-blue-200 text-blue-800";
        case "Avançado":
          return "bg-green-200 text-green-800";
        default:
          return "bg-gray-200 text-gray-800";
      }
    };

    return (
      <div
        ref={ref}
        className={`p-4 sm:p-6 lg:p-8 shadow-lg min-h-full ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`border-b-2 pb-4 sm:pb-6 mb-4 sm:mb-6 ${
            isDark ? "border-blue-400" : "border-primary-600"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
            {data.personalInfo.name || "Seu Nome"}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={14} />
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Resumo Profissional
            </h2>
            <p className="leading-relaxed text-sm sm:text-base break-words">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getLevelColor(
                    skill.level
                  )}`}
                >
                  {skill.name} • {skill.level}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Experiência Profissional
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className={`border-l-2 pl-3 sm:pl-4 ${
                    isDark ? "border-blue-400" : "border-primary-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                    <h3 className="font-semibold text-sm sm:text-base break-words">
                      {exp.position || "Cargo"}
                    </h3>
                    <span className="text-xs sm:text-sm opacity-75 shrink-0">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.isCurrentJob ? "Atual" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p
                    className={`font-medium mb-1 sm:mb-2 text-sm sm:text-base ${
                      isDark ? "text-blue-400" : "text-primary-600"
                    }`}
                  >
                    {exp.company || "Empresa"}
                  </p>
                  {exp.description && (
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90 break-words">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!data.personalInfo.name &&
          !data.personalInfo.summary &&
          data.skills.length === 0 &&
          data.experiences.length === 0 && (
            <div
              className={`text-center py-8 sm:py-12 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            >
              <User size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-base sm:text-lg">
                Seu currículo aparecerá aqui
              </p>
              <p className="text-sm">
                Preencha os campos ao lado para ver o preview
              </p>
            </div>
          )}
      </div>
    );
  }
);

CVPreview.displayName = "CVPreview";
