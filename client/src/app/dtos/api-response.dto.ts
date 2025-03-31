export class ApiResponseDto {
  Data?: any;
  Error?: string;
  Message?: string;
  IsSuccess: boolean = false;
  StatusCode?: string;
}
