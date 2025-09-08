import React from "react";

type PersonalHeaderProps = {
  name: string;
  title: string;
  email: string;
  phone: string;
};

const PersonalHeader: React.FC<PersonalHeaderProps> = ({
  name,
  title,
  email,
  phone,
}) => {
  return (
    <div className="border-b pb-4 mb-4 text-center">
      <h1 className="text-2xl font-bold">{name || "Seu Nome Completo"}</h1>
      <p className="text-lg text-gray-700">
        {title || "Seu Cargo ou Objetivo Profissional"}
      </p>
      <p className="text-sm text-gray-500">{email || "seuemail@exemplo.com"}</p>
      <p className="text-sm text-gray-500">{phone || "1234567890"}</p>
    </div>
  );
};

export default PersonalHeader;
