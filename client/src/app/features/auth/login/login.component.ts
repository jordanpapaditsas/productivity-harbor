import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PhTextBoxComponent } from '../../../shared/components/ph-text-box/ph-text-box.component';
import { UserDto } from '../../../core/dto/user/user.dto';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatFormFieldModule, MatIconModule, PhTextBoxComponent],
})
export class LoginComponent implements OnInit {
  user: UserDto;
  private authService = inject(AuthService);

  constructor() {
    this.user = new UserDto();
  }

  ngOnInit() {}

  onLoginClick(userName: string | undefined, password: string | undefined) {}
}
