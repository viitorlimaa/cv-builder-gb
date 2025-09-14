export const mockAIService = {
  enhanceText: async (
    text: string,
    type: "summary" | "experience"
  ): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.1) {
      // 90% success rate
      const enhancements = {
        summary: [
          "Profissional experiente com sólida formação e histórico comprovado de resultados excepcionais.",
          "Especialista dedicado com expertise técnica e habilidades interpessoais desenvolvidas.",
          "Líder estratégico com visão analítica e capacidade de implementar soluções inovadoras.",
        ],
        experience: [
          "Liderou iniciativas estratégicas que resultaram em aumento de 25% na eficiência operacional.",
          "Desenvolveu e implementou processos otimizados, reduzindo custos em 15% e melhorando a qualidade.",
          "Gerenciou equipes multidisciplinares, entregando projetos complexos dentro do prazo e orçamento.",
        ],
      };

      const options = enhancements[type];
      return options[Math.floor(Math.random() * options.length)];
    } else {
      throw new Error("Falha na conexão com o serviço de IA");
    }
  },
};
