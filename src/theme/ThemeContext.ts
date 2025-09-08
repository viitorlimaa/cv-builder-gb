import { createContext } from "react";

export type Theme = "light" | "dark" | "corporate";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
