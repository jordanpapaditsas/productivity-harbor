import { Component, inject, OnInit, signal } from '@angular/core';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhSelectBoxComponent } from '../../../shared/components/ph-select-box/ph-select-box.component';
import { UserDto } from '../../../core/dto/user/user.dto';
import { UserService } from '../../user/user.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [PhContainerComponent, PhToolbarComponent, PhSelectBoxComponent],
})
export class AdminHomeComponent implements OnInit {
  user = signal<UserDto | null>(null);
  dataSource = signal<UserDto[]>([]);
  userService = inject(UserService);
  id: any;

  constructor() {
    this.id = Guid.parse('EED6A6A2-09A2-4D3F-8163-87BE46C9AC57');
    this.user.set(new UserDto());
    this.userService.getUserById(this.id).subscribe((response) => {
      this.user.set(response);
    });
  }

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource() {
    this.userService.getAllUsersData().subscribe((response) => {
      this.dataSource.set(response);
    });
  }

  OnUserValueChange(e: any) {
    debugger;
  }
  onUserSelectionChange(e: any) {
    debugger;
  }
}
