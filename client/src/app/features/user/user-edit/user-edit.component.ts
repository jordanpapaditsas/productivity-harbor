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
  viewChild,
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
import { MatSelectModule } from '@angular/material/select';
import { SocialMediaService } from '../../settings/social-media/social-media.service';
import { UserSocialMediaMapService } from '../../../shared/services/relation-services/user-social-media.service';
import { UserSocialMediaMapDto } from '../../../core/dto/relations/user-social-media-map.dto';
import { PhDialogService } from '../../../shared/services/ph-dialog.service';
import { DialogTypeEnum } from '../../../core/enums/dialog/dialog-type.enum';

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
  fileInput = viewChild<ElementRef>('fileInput');
  newUserTitle!: string;
  contactTitle: string = 'Contact';
  personalInfoTitle: string = 'Personal Info';

  userId = input<Guid>();
  exitScreen = output<EventEmitter<void>>();
  isInEditMode = signal<boolean>(false);
  isSocialMediaForm = signal<boolean>(false);

  user!: UserDto;
  userSocialMediaArray: any;
  userSocialMedia!: UserSocialMediaMapDto;
  socialMedia: SocialMediaDto[] = [];

  private userService = inject(UserService);
  private socialMediaService = inject(SocialMediaService);
  private userSocialMediaService = inject(UserSocialMediaMapService);
  private dialogService = inject(PhDialogService);

  constructor() {
    this.user = new UserDto();
    this.userSocialMedia = new UserSocialMediaMapDto();
    this.userSocialMediaArray = [];

    effect(() => {
      if (this.userId()) {
        this.getUserDataSource();
      }
    });
    if (!this.user) {
      this.newUserTitle = 'New User';
    }
  }

  ngOnInit() {
    this.getAllSocialMedia();
  }

  getAllSocialMedia() {
    this.socialMediaService.getAllSocialMedia().subscribe((response) => {
      this.socialMedia = response;
    });
  }

  getUserDataSource() {
    this.userService.getUserById(this.userId()!).subscribe((response) => {
      this.user = response;
    });
  }

  onExitClicked(e: any) {
    this.exitScreen.emit(e);
  }

  onSaveClicked(e: any) {
    if (!this.user.Id) {
      this.userService.createUser(this.user).subscribe((response) => {
        this.user = response;
      });
    } else if (this.user.Id) {
      debugger;
      this.user.UserSocialMediaLinksMap = [];
      this.user.UserSocialMediaLinksMap.push(...this.userSocialMediaArray);
      this.userService.updateUser(this.user).subscribe((response) => {
        this.user = response;
      });
    }
  }

  onEditClicked(e: any) {
    this.isInEditMode.set(!this.isInEditMode());
  }

  triggerAvatarUpload() {
    this.fileInput()?.nativeElement.click();
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
    this.isSocialMediaForm.set(true);
    if (this.isSocialMediaForm()) {
      this.userSocialMedia = new UserSocialMediaMapDto();
      this.userSocialMediaArray.push(this.userSocialMedia);
    }
  }

  onClearSocialMediaFormClicked() {
    this.isSocialMediaForm.set(false);
    this.userSocialMediaArray = [];
    this.userSocialMedia = new UserSocialMediaMapDto();
  }

  async onSaveUserSocialMediaClicked(
    userSocial: UserSocialMediaMapDto,
    index: number
  ) {
    if (!userSocial.Url) {
      let result = await this.dialogService.alertDialog(
        'Warning Message',
        'Please type a correct Url for your social media.',
        DialogTypeEnum.Danger
      );
      return result;
    }

    this.userSocialMedia = userSocial;
    this.userSocialMediaService
      .createUserSocialMediaMap(this.userSocialMedia)
      .subscribe((response) => {
        this.userSocialMedia = response;

        this.getUserDataSource();
        this.onClearSocialMediaFormClicked();
      });
  }

  onSocialMediaSelectionChange(socialMedia: SocialMediaDto) {
    this.userSocialMedia.SocialMediaId = socialMedia.Id;
    this.userSocialMedia.UserId = this.user.Id;
  }
}
