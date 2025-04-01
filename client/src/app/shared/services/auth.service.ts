import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDto } from '../../core/dto/shared/api-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:5000/api';
  controller: string = 'Accounts';
  private httpClient = inject(HttpClient);

  register(data: FormData): Observable<ApiResponseDto> {
    return this.httpClient.post<ApiResponseDto>(
      `${this.baseUrl}/${this.controller}/register`,
      data
    );
  }
}
