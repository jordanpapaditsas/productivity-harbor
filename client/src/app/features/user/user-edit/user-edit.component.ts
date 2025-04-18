import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserService } from '../user.service';
import { UserDto } from '../../../core/dto/user/user.dto';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PhTextBoxComponent } from '../../../shared/components/ph-text-box/ph-text-box.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/input';
import { SocialMediaDto } from '../../../core/dto/user/social-media.dto';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  imports: [
    PhToolbarComponent,
    PhContainerComponent,
    MatIconModule,
    CommonModule,
    PhTextBoxComponent,
    MatCheckboxModule,
    FormsModule,
    MatLabel,
  ],
})
export class UserEditComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  userId = input<Guid | null>(null);
  private userService = inject(UserService);
  user!: UserDto;
  newUserTitle!: string;
  contactTitle: string = 'Contact';
  personalInfoTitle: string = 'Personal Info';
  isInEditMode = signal<boolean>(false);
  socialMedia = signal<SocialMediaDto[]>([]);

  exitScreen = output<EventEmitter<void>>();

  constructor() {
    this.user = new UserDto();
    effect(() => {
      if (this.userId()) {
        this.userService.getUserById(this.userId()!).subscribe((response) => {
          this.user = response;
        });
      }
    });
    if (!this.user) {
      this.newUserTitle = 'New User';
    }
  }

  ngOnInit() {}

  onUserEditExit(e: any) {
    this.exitScreen.emit(e);
  }

  onUserEditSave(e: any) {
    if (!this.user.Id) {
      this.userService.createUser(this.user).subscribe((response) => {
        this.user = response;
      });
    } else if (this.user.Id) {
      this.userService.updateUser(this.user).subscribe((response) => {
        this.user = response;
      });
    }
  }

  triggerAvatarUpload() {
    this.fileInput.nativeElement.click();
  }

  onAvatarChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.user.Avatar = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onColorChange(e: any) {
    this.user.Color = e.target.value;
  }
}
