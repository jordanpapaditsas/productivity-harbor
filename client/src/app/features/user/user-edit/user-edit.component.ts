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
import { SocialMediaDto } from '../../../core/dto/shared/social-media.dto';
import { UserSocialMediaMapDto } from '../../../core/dto/relations/user-social-media-map.dto';
import { MatSelectModule } from '@angular/material/select';
import { SocialMediaService } from '../../settings/social-media/social-media.service';
import { UserSocialMediaMapService } from '../../../shared/services/relation-services/user-social-media.service';

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
    MatSelectModule,
  ],
})
export class UserEditComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  userId = input<Guid | null>(null);
  private userService = inject(UserService);
  private socialMediaService = inject(SocialMediaService);
  private userSocialMediaService = inject(UserSocialMediaMapService);
  user!: UserDto;
  newUserTitle!: string;
  contactTitle: string = 'Contact';
  personalInfoTitle: string = 'Personal Info';
  isInEditMode = signal<boolean>(false);
  socialMediaLinks = signal<SocialMediaDto[]>([]);

  exitScreen = output<EventEmitter<void>>();
  isSocialMediaFormVisible = signal<boolean>(false);
  userSocialMedia!: UserSocialMediaMapDto;

  constructor() {
    debugger;
    this.user = new UserDto();
    this.userSocialMedia = new UserSocialMediaMapDto();
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

  ngOnInit() {
    this.getAllSocialMedia();
  }

  onUserEditExit(e: any) {
    this.exitScreen.emit(e);
  }

  getAllSocialMedia() {
    this.socialMediaService
      .getAllSocialMedia()
      .subscribe((response: SocialMediaDto[]) => {
        this.socialMediaLinks.set(response);
      });
  }
  onUserEditSave(e: any) {
    if (!this.user.Id) {
      this.userService.createUser(this.user).subscribe((response) => {
        this.user = response;
      });
    } else if (this.user.Id) {
      debugger;
      this.userSocialMediaService
        .createUserSocialMediaMap(this.userSocialMedia)
        .subscribe((response) => {
          this.userSocialMedia = response;

          this.user.UserSocialMedia.push(this.userSocialMedia);
          this.userService.updateUser(this.user).subscribe((response) => {
            this.user = response;
          });
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

  addSocialMedia(e: any) {
    this.isSocialMediaFormVisible.set(true);
  }

  onSocialMediaSelectionChange(socialMedia: SocialMediaDto) {
    debugger;
    this.userSocialMedia.SocialMediaId = socialMedia.Id;
    this.userSocialMedia.UserId = this.user.Id;
  }
}
