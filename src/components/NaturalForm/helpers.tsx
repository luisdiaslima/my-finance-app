import { IndividualData } from "@/types/User.interface";

export const validateFormData = (data: IndividualData) => {
  const newErrors: { [key: string]: string } = {};

  if (!data.name || data.name.trim().length < 8) {
    newErrors.name = "Este campo deve ter no mínimo 11 caracteres.";
  }

  if (!data.age || Number(data.age) < 18 ) {
    newErrors.age = "Você deve ter no mínimo 18 anos.";
  }

  if (!data.document || data.document?.trim().length < 11) {
    newErrors.document = "Documento inválido.";
  }

  if (!data.income || Number(data.income) <= 0) {
    newErrors.monthlyIncome = "Seu faturamento mensal não é suficiente.";
  }

  if (!data.city || data.city.trim().length <= 0) {
    newErrors.city = "Este campo é obrigatório.";
  }

  return newErrors;
};
