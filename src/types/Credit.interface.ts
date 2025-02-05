import { CompanyData, IndividualData } from "./User.interface";

export type CreditStatus = "APPROVED" | "DENIED";
export interface CreditResult {
  max_amount?: number;
  status: CreditStatus;
}

export type StoredConsultation<T> = {
  url: string;
  payload: T;
  credit_result: CreditResult;
  timestamp: string;
};

export interface PersonData {
  person: IndividualData;
  credit_result: CreditResult;
}

export interface JuridicalData {
  company: CompanyData;
  credit_result: CreditResult;
}

export interface SimulationsData {
  persons: PersonData[];
  companies: JuridicalData[];
}
