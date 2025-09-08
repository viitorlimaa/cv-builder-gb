import { ThemeProvider } from "./theme/ThemeProvider";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Skeleton from "./components/ui/Skeleton";
import Toast from "./components/ui/Toast";
import { PersonalInfo } from "./components/form/PersonalInfo";
import { Skills } from "./components/form/Skills";
import { Experience } from "./components/form/Experience"; 
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <ThemeSwitcher />
          <Link to="/">Dados Pessoais</Link>
          <Link to="/skills">Habilidades</Link>
          <Link to="/experience">Experiências</Link> {/* Link adicionado */}

          <LoadingSpinner />
          <Skeleton />
          <Toast message="Hello, world!" type="success" onClose={() => {}} />

          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} /> {/* Rota corrigida */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
