import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginDto } from '../../../core/dtos/auth/login.dto';
import { Router } from '@angular/router';
import { PhLoadingSpinnerComponent } from '../../../shared/components/ph-loading-spinner/ph-loading-spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { PhTextBoxComponent } from '../../../shared/components/ph-text-box/ph-text-box.component';
import { PhButtonComponent } from '../../../shared/components/ph-button/ph-button.component';
import { ChangeFormType } from '../../../core/types/change-form-type';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    PhLoadingSpinnerComponent,
    ReactiveFormsModule,
    FooterComponent,
    PhTextBoxComponent,
    PhButtonComponent,
    SignUpComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  protected loginDto: LoginDto;
  protected isLoading = signal<boolean>(false);
  private authService = inject(AuthService);
  private router = inject(Router);
  protected isUserNotFoundErrorVisible = signal<boolean>(false);
  protected isUserCredentialsNotValidErrorVisible = signal<boolean>(false);
  protected userNotFound = signal<number>(400);
  protected userInvalidCredentials = signal<number>(401);
  protected incorrectCredentialsMessage: string =
    '  The username or password you entered is incorrect. Please check your credentials and try again.';
  protected accountNotFound: string =
    'No account found with the provided username. Please verify your entry or create a new account.';
  protected isPasswordVisible = signal<boolean>(true);
  protected changePasswordType = signal<boolean>(true);
  protected formType = signal<ChangeFormType>('login');

  constructor(private formBuilder: FormBuilder) {
    this.loginDto = new LoginDto();
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: [localStorage.getItem('username') || '', Validators.required],
      password: ['', Validators.required],
    });
  }

  protected login() {
    this.isUserNotFoundErrorVisible.set(false);
    this.isUserCredentialsNotValidErrorVisible.set(false);

    if (this.loginForm.valid) {
      this.loginDto.UserName = this.loginForm.value.username;
      this.loginDto.Password = this.loginForm.value.password;
      this.isLoading.set(true);
      this.authService.login(this.loginDto).subscribe({
        next: (response) => {
          if (response.IsSuccess) {
            localStorage.setItem('username', this.loginDto.UserName);
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
          if (error.error.StatusCode === this.userNotFound()) {
            this.isUserNotFoundErrorVisible.set(true);
          } else if (error.error.StatusCode === this.userInvalidCredentials()) {
            this.isUserCredentialsNotValidErrorVisible.set(true);
          }
        },
      });
    } else {
    }
  }

  viewPassword() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
    this.changePasswordType.set(!this.changePasswordType());
  }

  onSignUpClick(type: ChangeFormType) {
    this.formType.set(type);
  }
}
