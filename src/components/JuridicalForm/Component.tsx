import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function JuridicalForm() {
  const navigate = useNavigate();
  const { companyData, setCompanyData } = useContext(UserContext);
  const [formData, setFormData] = useState(companyData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanyData(formData); 
    alert("Dados salvos com sucesso!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Pessoa Jurídica
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Preencha os dados para pessoa jurídica.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="companyName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Razão Social
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="cnpj"
                className="block text-sm/6 font-medium text-gray-900"
              >
                CNPJ
              </label>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                value={formData.cnpj}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="monthlyRevenue"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Faturamento Mensal
              </label>
              <input
                id="monthlyRevenue"
                name="monthlyRevenue"
                type="number"
                value={formData.monthlyRevenue}
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
