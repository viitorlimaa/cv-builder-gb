import React from "react";

type Experience = {
  company: string;
  role: string;
  period: string;
  description?: string[];
};

type ExperienceSectionProps = {
  experience: Experience[];
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Experiência</h2>
      {experience.length > 0 ? (
        <div>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3 text-gray-700">
              <h3 className="font-semibold">
                {exp.company} - {exp.role} ({exp.period})
              </h3>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc list-inside mt-1 ml-4">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-sm">
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Adicione sua experiência aqui</p>
      )}
    </div>
  );
};

export default ExperienceSection;
