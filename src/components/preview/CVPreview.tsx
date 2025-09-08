import { useCVData } from "../../hooks/use-cvData";
import { PersonalHeader } from "./PersonalHeader";
import { SkillsSection } from "./SkillsSection";
import { ExperienceSection } from "./ExperienceSection";

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
