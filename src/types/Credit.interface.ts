import { CompanyData, IndividualData } from "./User.interface";

export type ApiResponse =
  | { status: 'APPROVED'; max_amount: number }
  | { status: 'DENIED' };

export type StoredConsultation = {
  url: string;
  payload: IndividualData | CompanyData;
  credit_result: ApiResponse;
  timestamp: string;
};