import React, { createContext, useContext, useState } from 'react';
import {  fakeApi } from '@/api/handlers';
import { CompanyData, IndividualData } from '@/types/User.interface';
import { ApiResponse, StoredConsultation } from '@/types/Credit.interface';



type CreditContextType = {
  consultations: StoredConsultation[];
  lastConsultation?: StoredConsultation;
  consultPerson: (payload: IndividualData) => Promise<ApiResponse>;
  consultCompany: (payload: CompanyData) => Promise<ApiResponse>;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consultations, setConsultations] = useState<StoredConsultation[]>([]);
  const [lastConsultation, setLastConsultation] = useState<StoredConsultation>();


  const consultPerson = async (payload: IndividualData) => {
    const credit_result = await fakeApi.post('/credit-score/person', payload);
    const newConsultation = {
      url: '/credit-score/person',
      payload,
      credit_result,
      timestamp: new Date().toISOString(),
    };
    setConsultations((prev) => [...prev, newConsultation]);
    setLastConsultation(newConsultation)
    return credit_result;
  };

  const consultCompany = async (payload: CompanyData) => {
    const credit_result = await fakeApi.post('/credit-score/company', payload);
    const newConsultation = {
      url: '/credit-score/company',
      payload,
      credit_result,
      timestamp: new Date().toISOString(),
    };
    setConsultations((prev) => [...prev, newConsultation]);
    return credit_result;
  };

  return (
    <CreditContext.Provider value={{ consultations, consultPerson, consultCompany, lastConsultation }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredit must be used within a CreditProvider');
  }
  return context;
};