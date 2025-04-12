import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserService } from '../user.service';
import { UserDto } from '../../../core/dto/user/user.dto';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  imports: [PhToolbarComponent, PhContainerComponent],
})
export class UserEditComponent implements OnInit {
  userId = input<Guid | null>(null);
  private userService = inject(UserService);
  user: UserDto = new UserDto();
  newUserTitle: string = 'New User';

  exitScreen = output<EventEmitter<void>>();

  constructor() {
    effect(() => {
      if (this.userId()) {
        this.userService.getUserById(this.userId()!).subscribe((response) => {
          this.user = response;
        });
      }
    });
  }

  ngOnInit() {}

  onUserEditExit(e: any) {
    this.exitScreen.emit(e);
  }
}
