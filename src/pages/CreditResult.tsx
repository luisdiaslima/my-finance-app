import { Button } from "@/components/Button/Component";
import { useCredit } from "@/context/CreditContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { lastConsultation } = useCredit();
  return (
    <>
      {lastConsultation?.credit_result?.status === "DENIED" ? (
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <div className="relative h-full w-full [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_800px_at_100%_200px,#FF7757,transparent)]">
              <div></div>
            </div>
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
            <div className="max-w-3xl text-center">
              <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900">
                Seu crédito foi
                <br />
                <span className="text-sky-900">Negado</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">
                Infelizmente sua solicitação de crédito foi negada.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <div className="relative h-full w-full [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[radial-gradient(circle_at_center,#8FFFB0,transparent)]">
              <div></div>
            </div>
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
            <div className="max-w-3xl text-center">
              <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900">
                Seu crédito foi
                <br />
                <span className="text-sky-900">Aprovado!</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-700">
                Você pode realizar um empréstimo de até R$
                {lastConsultation?.credit_result?.max_amount}.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate("/consultas")}
              variant="primary"
              label="Minhas consultas"
            />
          </div>
          </div>
        </div>
      )}
    </>
  );
}
