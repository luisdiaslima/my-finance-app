import { CompanyData } from "@/types/User.interface";

export const validateFormData = (data: CompanyData) => {
  const newErrors: { [key: string]: string } = {};

  if (!data.name || data.name.trim().length < 8) {
    newErrors.name = "Este campo deve ter no mínimo 11 caracteres.";
  }

  if (!data.document || data.document?.trim().length < 14) {
    newErrors.document = "Documento inválido.";
  }

  if (!data.revenue || Number(data.revenue) < 500) {
    newErrors.revenue = "Seu faturamento mensal não é suficiente.";
  }

  if (!data.city || data.city.trim().length <= 0) {
    newErrors.city = "Este campo é obrigatório.";
  }

  return newErrors;
};
