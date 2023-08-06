export interface IResponse {
  status: boolean;
  timestamp: string;
  path: string;
  success: boolean;
  message: string | string[];
  code: number;
}
