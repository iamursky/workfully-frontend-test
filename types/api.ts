import type { AxiosError } from "axios";

export interface IApiError {
  status: number;
  error: string;
}

export type AxiosApiError = AxiosError<IApiError>;
