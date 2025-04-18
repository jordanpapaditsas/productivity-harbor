import { Component, OnInit } from '@angular/core';
import { UserEditComponent } from '../../user/user-edit/user-edit.component';
import { UserDto } from '../../../core/dto/user/user.dto';
import { Guid } from 'guid-typescript';
import { PhPopupComponent } from '../../../shared/components/ph-popup/ph-popup.component';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [
    UserEditComponent,
    PhPopupComponent,
    PhContainerComponent,
    PhToolbarComponent,
  ],
})
export class AdminHomeComponent implements OnInit {
  user: UserDto = new UserDto();
  isUserEditVisible: boolean = false;

  constructor() {
    this.user.Id = Guid.parse('eed6a6a2-09a2-4d3f-8163-87be46c9ac57');
    this.isUserEditVisible = true;
  }

  ngOnInit() {}

  onExitClicked(e: any) {
    this.isUserEditVisible = false;
  }

  displayUserEdit(e: any) {
    this.isUserEditVisible = !this.isUserEditVisible;
  }
}
