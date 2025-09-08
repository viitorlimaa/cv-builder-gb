import { ThemeProvider } from "./theme/themeProvider";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { PersonalInfo } from "./components/form/PersonalInfo";
import { Skills } from "./components/form/Skills";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ThemeSwitcher />

        <Link to="/">Dados Pessoais</Link>
        <Link to="/skills">Habilidades</Link>

        <Routes>
          <Route path="/" element={<PersonalInfo />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
