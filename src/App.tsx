// import { PersonalInfo } from "./components/form/PersonalInfo";

// function App() {
//   return (
//     <div>
//       <PersonalInfo />
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import { PersonalInfo } from "./components/form/PersonalInfo";
import Skills from "./components/form/Skills";




function App() {
  const [activeTab, setActiveTab] = useState<"personal" | "skills">("personal");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
     

      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-6">
        {/* Abas */}
        <div className="flex gap-6 border-b pb-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={
              activeTab === "personal"
                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                : "text-gray-500"
            }
          >
            Dados Pessoais
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className={
              activeTab === "skills"
                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                : "text-gray-500"
            }
          >
            Habilidades
          </button>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === "personal" && (
          <div>
            <PersonalInfo />
          </div>
        )}

        {activeTab === "skills" && (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
           
            <div>
              <Skills />
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default App;