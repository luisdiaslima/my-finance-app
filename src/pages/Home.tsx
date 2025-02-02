import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Escolha o Tipo de Usuário
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Selecione abaixo se você é uma pessoa física ou jurídica.
        </p>
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/pessoa-fisica")}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Pessoa Física
          </button>
          <button
            onClick={() => navigate("/pessoa-juridica")}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Pessoa Jurídica
          </button>
        </div>
      </div>
    </div>
  );
}
