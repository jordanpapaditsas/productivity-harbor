import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../../core/dto/user/user.dto';
import { MatLabel } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChangePasswordDto } from '../../../core/dto/auth/change-password.dto';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports: [MatLabel, ReactiveFormsModule],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  public userId = input<Guid | null>(null);
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
    if (this.changePasswordForm.valid) {
      this.changePasswordDto.User = this.user();
      this.changePasswordDto.currentPassword =
        this.changePasswordForm.value.currentPassword;
      this.changePasswordDto.newPassword =
        this.changePasswordForm.value.newPassword;

      this.authService.changePassword(this.changePasswordDto).subscribe({
        next: (response) => {
          this.toastr.success('Password changed successfully!');
        },
        error: (error) => {
          this.toastr.error("Couldn't change password. Please try again.");
          console.log(error);
        },
      });
    }
  }
}
