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
import { UserSocialMediaMapDto } from '../../../core/dto/relations/user-social-media-map.dto';
import { ToastrService } from 'ngx-toastr';
import { PhPopupComponent } from '../../../shared/components/ph-popup/ph-popup.component';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';

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
    PhPopupComponent,
    ChangePasswordComponent,
  ],
})
export class UserEditComponent implements OnInit {
  fileInput = viewChild<ElementRef>('fileInput');
  newUserTitle!: string;
  contactTitle: string = 'Contact';
  personalInfoTitle: string = 'Personal Info';

  userId = input<Guid | undefined | null>();
  exitScreen = output<EventEmitter<void>>();
  isUserInEditMode = signal<boolean>(true);
  user!: UserDto;
  socialMedia: SocialMediaDto[] = [];

  isSocialMediaFormVisible = signal<boolean>(false);
  isChangePasswordPopupVisible = signal<boolean>(false);
  socialMediaRowIndex = signal<number>(0);
  rowKeys: Set<Guid> = new Set();

  userSocialMediaTempArray: any;
  userSocialMediaDto!: UserSocialMediaMapDto;

  private userService = inject(UserService);
  private socialMediaService = inject(SocialMediaService);
  private toastr = inject(ToastrService);

  constructor() {
    this.initializeUserDto();

    effect(() => {
      if (this.userId()) {
        this.getUserDataSource();
      } else {
        this.initializeUserDto();
      }
    });
    if (!this.user) {
      this.newUserTitle = 'New User';
    }
  }

  ngOnInit() {
    this.getAllSocialMedia();
  }

  initializeUserDto() {
    this.user = new UserDto();
    this.userSocialMediaDto = new UserSocialMediaMapDto();
    this.userSocialMediaTempArray = [];
    this.user.Address = { Street: '', City: '', Zip: '' };
    this.user.Phone = { Home: '', Mobile: '', Work: '' };
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
      this.user.UserSocialMediaLinksMap = this.userSocialMediaTempArray;
      this.userService.createUser(this.user).subscribe({
        next: (response) => {
          this.user = response;
          this.toastr.success('User created successfully.');
        },
        error: (error) => {},
      });
    } else if (this.user.Id) {
      this.userService.updateUser(this.user).subscribe({
        next: (response) => {
          this.user = response;
          this.toastr.success('User updated successfully.');
        },
        error: (error) => {},
      });
    }
  }

  onEditClicked(e: any) {
    this.isUserInEditMode.set(!this.isUserInEditMode());
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

  async onDeactivateClicked(e: any) {
    if (this.user) {
      this.user.IsActive = false;

      this.userService.updateUserStatus(this.user).subscribe({
        next: (response) => {
          this.user = response;
          this.toastr.success('User deactivated successfully.');
        },
        error: (error) => {},
      });
    }
  }

  addUserSocialMedia(e: any) {
    this.isSocialMediaFormVisible.set(true);
    this.userSocialMediaDto = new UserSocialMediaMapDto();
  }

  onSaveUserSocialMediaRowClicked(userSocialMedia: UserSocialMediaMapDto) {
    this.userSocialMediaDto = userSocialMedia;
    if (this.user.Id) {
      this.userSocialMediaTempArray.push(this.userSocialMediaDto);
      this.user.UserSocialMediaLinksMap.push(...this.userSocialMediaTempArray);
      this.isSocialMediaFormVisible.set(false);
    } else {
      this.userSocialMediaTempArray.push(this.userSocialMediaDto);
      this.isSocialMediaFormVisible.set(false);
    }
  }

  onClearSocialMediaFormClicked() {
    this.isSocialMediaFormVisible.set(false);
    this.userSocialMediaTempArray = [];
    this.userSocialMediaDto = new UserSocialMediaMapDto();
  }

  clearRowKeys(row: any) {
    this.rowKeys.delete(row.Id);
  }

  onSocialMediaSelectionChange(socialMedia: SocialMediaDto) {
    this.userSocialMediaDto.SocialMediaId = socialMedia.Id;
    this.userSocialMediaDto.UserId = this.user.Id;
    this.userSocialMediaDto.Icon = socialMedia.Icon;
    this.userSocialMediaDto.Name = socialMedia.Name;
  }

  onEditSocialMediaRowClicked(
    userSocialMedia: UserSocialMediaMapDto,
    index: number
  ) {
    this.socialMediaRowIndex.set(index);
    this.rowKeys.add(userSocialMedia.Id!);
  }

  isSocialMediaRowInEditMode(row: any, index: number) {
    return this.rowKeys.has(row.Id) && this.socialMediaRowIndex() === index;
  }

  onChangePasswordClicked(e: any) {
    this.isChangePasswordPopupVisible.set(true);
  }

  onHideChangePasswordPopup(e: any) {
    this.isChangePasswordPopupVisible.set(false);
  }
}
