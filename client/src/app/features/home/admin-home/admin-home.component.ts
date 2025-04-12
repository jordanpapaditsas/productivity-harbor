import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from '../../user/user-edit/user-edit.component';
import { UserDto } from '../../../core/dto/user/user.dto';
import { Guid } from 'guid-typescript';
import { PhPopupComponent } from '../../../shared/components/ph-popup/ph-popup.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [UserEditComponent, PhPopupComponent],
})
export class AdminHomeComponent implements OnInit {
  user: UserDto = new UserDto();
  isUserEditVisible: boolean = true;
  constructor() {
    this.user.Id = Guid.parse('E52484FB-F255-4E49-1F44-08DD76D1306C');
  }

  ngOnInit() {}

  onExitClicked(e: any) {
    this.isUserEditVisible = false;
  }

  displayUserEdit(e: any) {
    this.isUserEditVisible = !this.isUserEditVisible;
  }
}
