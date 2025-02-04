import { CompanyData, IndividualData } from "@/types/User.interface";
import { createContext, useState, ReactNode } from "react";


type UserContextType = {
  individualData: IndividualData;
  setIndividualData: (data: IndividualData) => void;
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
};

export const UserContext = createContext<UserContextType>({
  individualData: {
    name: "",
    age: 0,
    document: "",
    income: 0,
    city: "",
  },
  setIndividualData: () => {},
  companyData: {
    name: "",
    document: "",
    revenue: 0,
    city: "",
  },
  setCompanyData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [individualData, setIndividualData] = useState<IndividualData>({
    name: "",
    age: 0,
    document: "",
    income: 0,
    city: "",
  });

  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    document: "",
    revenue: 0,
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
