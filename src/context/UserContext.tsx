import { createContext, useState, ReactNode } from "react";

type IndividualData = {
  name: string;
  age: string;
  cpf: string;
  monthlyIncome: string;
  city: string;
};

type CompanyData = {
  companyName: string;
  cnpj: string;
  monthlyRevenue: string;
  city: string;
};

type UserContextType = {
  individualData: IndividualData;
  setIndividualData: (data: IndividualData) => void;
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
};

export const UserContext = createContext<UserContextType>({
  individualData: {
    name: "",
    age: "",
    cpf: "",
    monthlyIncome: "",
    city: "",
  },
  setIndividualData: () => {},
  companyData: {
    companyName: "",
    cnpj: "",
    monthlyRevenue: "",
    city: "",
  },
  setCompanyData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [individualData, setIndividualData] = useState<IndividualData>({
    name: "",
    age: "",
    cpf: "",
    monthlyIncome: "",
    city: "",
  });

  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: "",
    cnpj: "",
    monthlyRevenue: "",
    city: "",
  });

  return (
    <UserContext.Provider
      value={{ individualData, setIndividualData, companyData, setCompanyData }}
    >
      {children}
    </UserContext.Provider>
  );
};
