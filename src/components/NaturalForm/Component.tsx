import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button/Component";
import { useCredit } from "@/context/CreditContext";
import { validateFormData } from "./helpers";
import { IndividualData } from "@/types/User.interface";

interface Errors {
  [key: string]: string;
}

export const NaturalForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IndividualData>({
    city: "",
    name: "",
    age: 0,
    document: "",
    income: 0,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { consultPerson } = useCredit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setErrorValue = (key: string, value: string) => {
    setErrors((prevErrors) => {
      return { ...prevErrors, [key]: value };
    });
  };

  const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 8) {
      return setErrorValue(
        "name",
        "Este campo deve ter no mínmo 11 caracteres."
      );
    }
    return setErrorValue("name", "");
  };

  const validateAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 18) {
      return setErrorValue("age", "Você deve ter no mínimo 18 anos.");
    }
    return setErrorValue("age", "");
  };

  const validateDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 11) {
      return setErrorValue("document", "Documento inválido.");
    }
    return setErrorValue("document", "");
  };

  const validateMonthlyIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 0) {
      return setErrorValue(
        "monthlyIncome",
        "Seu faturamento mensal não é suficiente."
      );
    }
    return setErrorValue("monthlyIncome", "");
  };

  const validateCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length <= 0) {
      return setErrorValue("city", "Este campo é obrigatório.");
    }
    return setErrorValue("city", "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateFormData(formData);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      console.error("handleSubmit:errors", errors);
      return;
    }

    setLoading(true);
    await consultPerson(formData);
    setLoading(false);
    navigate("/seu-credito");
  };
  return (
    <form role="form" onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="space-y-12">
        <div className="pb-10">
          <h2 className="mx-auto font-semibold mb-4 max-w-2xl text-xl text-slate-700">
            Pessoa Física
          </h2>
          <p className="mx-auto max-w-2xl text-md text-slate-700">
            Preencha os dados para pessoa física.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-slate-700"
              >
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                test-id
                onChange={handleChange}
                onBlur={validateName}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />
              <span className="block text-sm/6 font-small text-red-500">
                {errors?.name}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="age"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Idade
              </label>
              <input
                id="age"
                name="age"
                type="number"
                onChange={handleChange}
                onBlur={validateAge}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />
              <span className="block text-sm/6 font-small text-red-500">
                {errors?.age}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="document"
                className="block text-sm/6 font-medium text-gray-900"
              >
                CPF
              </label>
              <input
                id="document"
                name="document"
                type="number"
                onChange={handleChange}
                onBlur={validateDocument}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />
              <span className="block text-sm/6 font-small text-red-500">
                {errors?.document}
              </span>
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="income"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Renda Mensal
              </label>
              <input
                id="income"
                name="income"
                type="number"
                onChange={handleChange}
                onBlur={validateMonthlyIncome}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />

              <span className="block text-sm/6 font-small text-red-500">
                {errors?.monthlyIncome}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Cidade
              </label>
              <input
                id="city"
                name="city"
                type="text"
                onChange={handleChange}
                onBlur={validateCity}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
              />

              <span className="block text-sm/6 font-small text-red-500">
                {errors?.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          type="button"
          variant="secondary"
          label="Voltar"
          onClick={() => navigate("/")}
        />

        <Button type="button" disabled={loading} variant="primary" label="Salvar" />
      </div>
    </form>
  );
};
