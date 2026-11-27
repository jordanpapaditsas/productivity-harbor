import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../../../core/dtos/user/user.dto';
import { MatLabel } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChangePasswordDto } from '../../../../core/dtos/auth/change-password.dto';
import { AuthService } from '../../../../shared/services/auth.service';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhButtonComponent } from '../../../../shared/components/ph-button/ph-button.component';
import { PhTextBoxComponent } from '../../../../shared/components/ph-text-box/ph-text-box.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
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
  protected user = signal<UserDto>({ createdAt: '', id: Guid.createEmpty() });
  protected changePasswordDto: ChangePasswordDto = {
    currentPassword: '',
    newPassword: '',
    userId: Guid.createEmpty(),
  };

  private userService = inject(UserService);
  private authService = inject(AuthService);
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
    this.userService.getById(this.userId()!).subscribe({
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
      this.changePasswordDto.userId = this.user().id;
      this.changePasswordDto.currentPassword =
        this.changePasswordForm.value.currentPassword;
      this.changePasswordDto.newPassword =
        this.changePasswordForm.value.newPassword;

      this.authService.changePassword(this.changePasswordDto).subscribe({
        next: (response) => {
          // this.toastr.success('Password has changed successfully!');
          // ADD MATERIAL NOTIFICATIONS SNACKBAR
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      // this.toastr.error(
      //   'New password and confirmation do not match. Please try again.',
      // );
      // ADD MATERIAL NOTIFICATIONS SNACKBAR
    }
  }

  onExitClick(e: any) {
    this.exitClicked.emit(e);
  }
}
