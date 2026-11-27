export interface ApiResponseDto {
  data?: any;
  error?: string;
  message?: string;
  messages?: string[];
  isSuccess: boolean;
  statusCode?: string;
}
