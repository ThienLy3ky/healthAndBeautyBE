export interface IResponse {
  timestamp: string;
  path: string;
  success: boolean;
  message: string | string[];
  code: number;
}
