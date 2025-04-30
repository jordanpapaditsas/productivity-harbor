import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginDto } from '../../../core/dto/auth/login.dto';
import { Router } from '@angular/router';
import { PhLoadingSpinnerComponent } from '../../../shared/components/ph-loading-spinner/ph-loading-spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../../../shared/layout/footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    PhLoadingSpinnerComponent,
    ReactiveFormsModule,
    FooterComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  protected loginDto: LoginDto;
  protected isLoading = signal<boolean>(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.loginDto = new LoginDto();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    debugger;
    if (this.loginForm.valid) {
      this.loginDto.UserName = this.loginForm.value.username;
      this.loginDto.Password = this.loginForm.value.password;
      this.isLoading.set(true);
      this.authService.login(this.loginDto).subscribe({
        next: (response) => {
          if (response.IsSuccess) {
            this.isLoading.set(false);
            console.log(response.Message);
            this.router.navigate(['/admin-home']);
          } else {
            console.log(response.Error);
            this.isLoading.set(false);
          }
        },
        error: (error) => {
          console.log('Server Error', error);
          this.isLoading.set(false);
        },
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
