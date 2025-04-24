import { Component, inject, OnInit, signal } from '@angular/core';
import { UserDto } from '../../../core/dto/user/user.dto';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhSelectBoxComponent } from '../../../shared/components/ph-select-box/ph-select-box.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  imports: [PhContainerComponent, PhToolbarComponent, PhSelectBoxComponent],
})
export class AdminHomeComponent implements OnInit {
  userService = inject(UserService);
  dataSource = signal<any>(null);
  user: UserDto;

  constructor() {
    this.user = new UserDto();
  }

  ngOnInit() {
    this.getUserDataSource();
  }

  getUserDataSource() {
    this.userService.getAllUsersData().subscribe((response) => {
      this.dataSource.set(response);
    });
  }

  onSelectionChange(e: any) {
    debugger;
  }

  onValueChange(e: any) {
    debugger;
    console.log(e);
  }
}
