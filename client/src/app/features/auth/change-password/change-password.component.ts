import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../../core/dtos/user/user.dto';
import { MatLabel } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChangePasswordDto } from '../../../core/dtos/auth/change-password.dto';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhButtonComponent } from '../../../shared/components/ph-button/ph-button.component';
import { PhTextBoxComponent } from '../../../shared/components/ph-text-box/ph-text-box.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [
    MatLabel,
    ReactiveFormsModule,
    PhToolbarComponent,
    PhButtonComponent,
    PhTextBoxComponent,
  ],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  public userId = input<Guid | null>(null);
  public exitClicked = output();
  protected user = signal<UserDto>(new UserDto());
  protected changePasswordDto: ChangePasswordDto = new ChangePasswordDto();

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  constructor() {}

  ngOnInit() {
    this.getUserById();
    this.buildForm();
  }

  buildForm() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  getUserById() {
    this.userService.getUserById(this.userId()!).subscribe({
      next: (response) => {
        this.user.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changePassword() {
    if (
      this.changePasswordForm.valid &&
      this.changePasswordForm.value.newPassword ===
        this.changePasswordForm.value.confirmPassword
    ) {
      this.changePasswordDto.UserId = this.user().Id;
      this.changePasswordDto.CurrentPassword =
        this.changePasswordForm.value.currentPassword;
      this.changePasswordDto.NewPassword =
        this.changePasswordForm.value.newPassword;

      this.authService.changePassword(this.changePasswordDto).subscribe({
        next: (response) => {
          this.toastr.success('Password has changed successfully!');
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.toastr.error(
        'New password and confirmation do not match. Please try again.',
      );
    }
  }

  onExitClick(e: any) {
    this.exitClicked.emit(e);
  }
}
