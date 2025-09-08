export const validateName = (name: string) =>
  name.trim().length > 0 ? "" : "O nome é obrigatório.";

export const validateEmail = (email: string) =>
  /\S+@\S+\.\S+/.test(email) ? "" : "E-mail inválido.";

export const validatePhone = (phone: string) =>
  /^[0-9]{8,15}$/.test(phone) ? "" : "Telefone inválido.";

export const validateLinkedin = (url: string) =>
  url.startsWith("https://linkedin.com/") ? "" : "Url inválida do LinkedIn.";

export const validateSummary = (summary: string, maxLength = 500) =>
  summary.length <= maxLength ? "" : `Máximo de ${maxLength} caracteres.`;
