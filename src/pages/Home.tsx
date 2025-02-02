import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Component";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#6d28d9_100%)]"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900">
            Simule agora seu empréstimo!
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">
            Selecione abaixo se você é uma pessoa física ou jurídica.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate("/pessoa-fisica")}
              variant="primary"
              label="Pessoa Física"
            />

            <Button
              onClick={() => navigate("/pessoa-juridica")}
              variant="secondary"
              label="Pessoa Jurídica"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
