import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { PhButtonComponent } from '../../../shared/components/ph-button/ph-button.component';
import { ChangeFormType } from '../../../core/types/change-form-type';
import { PhTextBoxComponent } from '../../../shared/components/ph-text-box/ph-text-box.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { RegisterDto } from '../../../core/dtos/auth/register.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PhButtonComponent, PhTextBoxComponent, ReactiveFormsModule],
})
export class SignUpComponent implements OnInit {
  changeFormType = output<ChangeFormType>();
  signupForm!: FormGroup;
  protected isPasswordVisible = signal<boolean>(true);
  protected changePasswordType = signal<boolean>(true);
  private readonly auth = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  isSubmitting = signal<boolean>(false);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.signupForm.reset();
  }

  private buildForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  viewPassword() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
    this.changePasswordType.set(!this.changePasswordType());
  }

  onChangeFormTypeClick(type: ChangeFormType) {
    debugger;
    this.changeFormType.emit(type);
  }

  signup() {
    if (this.signupForm.valid) {
      this.isSubmitting.set(true);
      const { username, password } = this.signupForm.value;
      const registerDto = new RegisterDto();

      registerDto.UserName = username;
      registerDto.Password = password;

      this.auth.createNewUser(registerDto).subscribe({
        next: (value) => {
          this.toastr.success(value.Message);
          this.isSubmitting.set(false);
          this.signupForm.reset();
        },
        error: (ex) => {
          debugger;
          if (ex.error && ex.error.Messages.length > 0) {
            ex.error.Messages.forEach((message: string) => {
              this.toastr.error(message);
            });
          }
          this.isSubmitting.set(false);
        },
      });
    }
  }
}
