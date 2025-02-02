import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function NaturalForm() {
  const navigate = useNavigate();
  const { individualData, setIndividualData } = useContext(UserContext);
  const [formData, setFormData] = useState(individualData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIndividualData(formData);
    alert("Dados salvos com sucesso!");
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Pessoa Física
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Preencha os dados para pessoa física.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
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
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="cpf"
                className="block text-sm/6 font-medium text-gray-900"
              >
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="monthlyIncome"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Renda Mensal
              </label>
              <input
                id="monthlyIncome"
                name="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
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
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm/6 font-semibold text-gray-900"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
