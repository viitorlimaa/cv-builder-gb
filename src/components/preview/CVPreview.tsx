import React from "react";
import PersonalHeader from "./PersonalHeader";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";

type Experience = {
  company: string;
  role: string;
  period: string;
  description?: string[];
};

type CVData = {
  name: string;
  email: string;
  phone: string;
  title: string;
};

type CVPreviewProps = {
  data: CVData;
  skills: string[];
  experiences: Experience[];
};

const CVPreview: React.FC<CVPreviewProps> = ({ data, skills, experiences }) => {
  return (
    <div
      id="cv-preview"
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border"
    >
      <PersonalHeader
        name={data.name}
        email={data.email}
        phone={data.phone}
        title={data.title}
      />

      <SkillsSection skills={skills} />
      <ExperienceSection experience={experiences} />
    </div>
  );
};

export default CVPreview;
