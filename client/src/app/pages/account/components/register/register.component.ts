import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  username: string = '';
  password: string = '';
  fullname: string = '';

  accountService = inject(AccountService);

  ngOnInit() {}

  onRegisterClick() {
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('fullname', this.fullname);

    this.accountService.registerUser(formData).subscribe((result) => {
      console.log(result);
    });
  }
}
