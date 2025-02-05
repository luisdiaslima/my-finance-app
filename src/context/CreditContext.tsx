import React, { createContext, useContext, useState } from "react";
import { fakeApi } from "@/api/handlers";
import { CompanyData, IndividualData } from "@/types/User.interface";
import {
  SimulationsData,
  CreditResult,
  StoredConsultation,
} from "@/types/Credit.interface";

type CreditContextType = {
  consultations: StoredConsultation<IndividualData | CompanyData>[];
  lastConsultation?: StoredConsultation<IndividualData | CompanyData> | null;
  consultPerson: (payload: IndividualData) => Promise<CreditResult>;
  consultCompany: (payload: CompanyData) => Promise<CreditResult>;
  getCreditList: () => Promise<SimulationsData>;
  deleteLastConsult: () => void;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lastConsultationFromStorage = localStorage.getItem("lastConsultation");
  const [consultations, setConsultations] = useState<
    StoredConsultation<IndividualData | CompanyData>[]
  >([]);
  const [lastConsultation, setLastConsultation] = useState<StoredConsultation<
    IndividualData | CompanyData
  > | null>(
    lastConsultationFromStorage ? JSON.parse(lastConsultationFromStorage) : null
  );

  const saveLastConsult = (
    payload: StoredConsultation<IndividualData | CompanyData>
  ) => {
    setLastConsultation(payload);
    localStorage.setItem("lastConsultation", JSON.stringify(payload));
  };

  const deleteLastConsult = () => {
    setLastConsultation(null);
    localStorage.removeItem("lastConsultation");
  };

  const consultPerson = async (payload: IndividualData) => {
    const credit_result = await fakeApi.post("/credit-score/person", payload);
    const newConsultation = {
      url: "/credit-score/person",
      payload,
      credit_result,
      timestamp: new Date().toISOString(),
    };
    setConsultations((prev) => [...prev, newConsultation]);
    saveLastConsult(newConsultation);
    return credit_result;
  };

  const consultCompany = async (payload: CompanyData) => {
    const credit_result = await fakeApi.post("/credit-score/company", payload);
    const newConsultation = {
      url: "/credit-score/company",
      payload,
      credit_result,
      timestamp: new Date().toISOString(),
    };
    setConsultations((prev) => [...prev, newConsultation]);
    return credit_result;
  };

  const getCreditList = async () => {
    const data = await fakeApi.get("/credit-score/list");
    return data;
  };

  return (
    <CreditContext.Provider
      value={{
        consultations,
        consultPerson,
        consultCompany,
        lastConsultation,
        deleteLastConsult,
        getCreditList,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
};
