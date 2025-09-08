import { useTheme } from "./useTheme";
import type { ChangeEvent } from "react";
import type { Theme } from "./ThemeContext";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    toggleTheme(e.target.value as Theme);
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm text-gray-600">Tema:</label>
      <select
        value={theme}
        onChange={handleChange}
        className="rounded-md border px-2 py-1 text-sm"
      >
        <option value="light">Claro</option>
        <option value="dark">Escuro</option>
        <option value="corporate">Corporativo</option>
      </select>
    </div>
  );
}
