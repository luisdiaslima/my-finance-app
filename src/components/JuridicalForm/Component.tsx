import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/Button/Component";

export const JuridicalForm = () => {
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
        <div className="pb-10">
        <h2 className="mx-auto font-semibold mb-4 max-w-2xl text-xl text-slate-700">
            Pessoa Jurídica
          </h2>
          <p className="mx-auto max-w-2xl text-md text-slate-700">
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
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
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
                value={formData.document}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
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
                value={formData.revenue}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-700"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          type="button"
          onClick={() => navigate("/")}
          variant="secondary"
          label="Voltar"
        />

        <Button
          type="button"
          onClick={() => navigate("/")}
          variant="primary"
          label="Salvar"
        />
      </div>
    </form>
  );
}
