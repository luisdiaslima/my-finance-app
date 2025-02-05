import {
  SimulationsData,
  CreditResult,
  StoredConsultation,
} from "@/types/Credit.interface";
import { CompanyData, IndividualData } from "@/types/User.interface";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const saveToLocalStorage = (key: string, data: any) => {
  const storedData = localStorage.getItem(key);
  const parsedData = storedData ? JSON.parse(storedData) : [];
  parsedData.push(data);
  localStorage.setItem(key, JSON.stringify(parsedData));
};

export const fakeApi = {
  async post(
    url: string,
    payload: IndividualData | CompanyData
  ): Promise<CreditResult> {
    await delay(1000);

    const isApproved = Math.random() > 0.5;
    const maxAmount = isApproved ? Math.floor(Math.random() * 100000) : 0;

    const credit_result: CreditResult = isApproved
      ? { status: "APPROVED", max_amount: maxAmount }
      : { status: "DENIED" };

    saveToLocalStorage("consultas", {
      url,
      payload,
      credit_result,
      timestamp: new Date().toISOString(),
    });

    return credit_result;
  },

  async get(url: string): Promise<SimulationsData> {
    await delay(1000);

    if (url === "/credit-score/list") {
      const storedData = localStorage.getItem("consultas");
      const consultas: StoredConsultation<IndividualData | CompanyData>[] =
        storedData ? JSON.parse(storedData) : [];

      const persons = consultas
        .filter(
          (consulta): consulta is StoredConsultation<IndividualData> =>
            consulta.url === "/credit-score/person"
        )
        .map((consulta) => ({
          person: consulta.payload,
          credit_result: consulta.credit_result,
        }));

      const companies = consultas
        .filter(
          (consulta): consulta is StoredConsultation<CompanyData> =>
            consulta.url === "/credit-score/company"
        )
        .map((consulta) => ({
          company: consulta.payload,
          credit_result: consulta.credit_result,
        }));

      return { persons, companies };
    }

    throw new Error("Rota não encontrada");
  },
};
