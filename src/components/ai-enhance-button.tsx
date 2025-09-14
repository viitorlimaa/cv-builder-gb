import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { mockAIService } from "../mocks/mock-ai-service";
import { useTheme } from "../hooks/use-theme";

export const AIEnhanceButton: React.FC<{
  text: string;
  type: "summary" | "experience";
  onEnhance: (enhancedText: string) => void;
  disabled?: boolean;
}> = ({ text, type, onEnhance, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const handleEnhance = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const enhanced = await mockAIService.enhanceText(text, type);
      onEnhance(enhanced);
    } catch (error) {
      console.error("Erro ao melhorar texto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnhance}
      disabled={disabled || !text.trim() || isLoading}
      className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md transition-colors ${
        disabled || !text.trim() || isLoading
          ? `${
              isDark ? "bg-gray-700 text-gray-500" : "bg-gray-200 text-gray-400"
            } cursor-not-allowed`
          : `${
              isDark
                ? "bg-purple-900 text-purple-300 hover:bg-purple-800"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`
      }`}
    >
      {isLoading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Sparkles size={14} />
      )}
      {isLoading ? "Melhorando..." : "Melhorar com IA"}
    </button>
  );
};
