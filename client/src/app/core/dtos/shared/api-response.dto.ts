export class ApiResponseDto {
  Data?: any;
  Error?: string;
  Message?: string;
  Messages?: string[];
  IsSuccess: boolean = false;
  StatusCode?: string;
}
