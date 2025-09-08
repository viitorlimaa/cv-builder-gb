import { useCVData } from "../hooks/useCVData";
import { PersonalHeader } from "./preview/PersonalHeader";
import { SkillsSection } from "./preview/SkillsSection";
import { ExperienceSection } from "./preview/ExperienceSection";

export function CVPreview() {
  const { cvData } = useCVData();

  return (
    <div
      id="cv-preview"
      className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-6 text-gray-900"
    >
      <PersonalHeader info={cvData.personalInfo} />
      <SkillsSection skills={cvData.skills} />
      <ExperienceSection experiences={cvData.experiences} />
    </div>
  );
}
