import React from "react";

type SkillsSectionProps = {
  skills: string[];
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Habilidades</h2>
      {skills.length > 0 ? (
        <ul className="list-disc list-inside">
          {skills.map((skill, index) => (
            <li key={index} className="text-gray-700">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Adicione suas habilidades aqui</p>
      )}
    </div>
  );
};

export default SkillsSection;
