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
  ChangeDetectionStrategy,
} from '@angular/core';
import { Guid } from 'guid-typescript';
import { UserService } from '../user.service';
import { UserDto } from '../../../../core/dtos/user/user.dto';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhContainerComponent } from '../../../../shared/components/ph-container/ph-container.component';
import { MatIconModule } from '@angular/material/icon';

import { PhTextBoxComponent } from '../../../../shared/components/ph-text-box/ph-text-box.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/input';
import { SocialMediaDto } from '../../../../core/dtos/shared/social-media.dto';
import { MatSelectModule } from '@angular/material/select';
import { SocialMediaService } from '../../settings/social-media/social-media.service';
import { UserSocialMediaMapDto } from '../../../../core/dtos/relations/user-social-media-map.dto';
import { PhPopupComponent } from '../../../../shared/components/ph-popup/ph-popup.component';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';
import { PhButtonComponent } from '../../../../shared/components/ph-button/ph-button.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PhToolbarComponent,
    PhContainerComponent,
    MatIconModule,
    PhTextBoxComponent,
    MatCheckboxModule,
    FormsModule,
    MatLabel,
    MatSelectModule,
    PhPopupComponent,
    ChangePasswordComponent,
    PhButtonComponent,
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
  user: UserDto = {
    createdAt: '',
    id: Guid.createEmpty(),
  };
  socialMedia: SocialMediaDto[] = [];

  isSocialMediaFormVisible = signal<boolean>(false);
  isChangePasswordPopupVisible = signal<boolean>(false);
  socialMediaRowIndex = signal<number>(0);
  rowKeys: Set<Guid> = new Set();

  userSocialMediaTempArray: any;
  userSocialMediaDto!: UserSocialMediaMapDto;

  private userService = inject(UserService);
  private socialMediaService = inject(SocialMediaService);

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
    debugger;
    this.userSocialMediaDto = {
      id: Guid.createEmpty(),
      userId: Guid.createEmpty(),
    };
    this.userSocialMediaTempArray = [];
    this.user.address = { street: '', city: '', zip: '' };
    this.user.phone = { home: '', mobile: '', work: '' };
  }

  getAllSocialMedia() {
    this.socialMediaService.getAllSocialMedia().subscribe((response) => {
      this.socialMedia = response;
    });
  }

  getUserDataSource() {
    this.userService.getById(this.userId()!).subscribe((response) => {
      this.user = response;
    });
  }

  onExitClicked(e: any) {
    this.exitScreen.emit(e);
  }

  onSaveClicked(e: any) {
    if (!this.user.id) {
      this.user.userSocialMediaLinksMap = this.userSocialMediaTempArray;
      this.userService.create(this.user).subscribe({
        next: (response) => {
          this.user = response;
          // this.toastr.success('User created successfully.');
          // ADD MATERIAL NOTIFICATIONS SNACKBAR
        },
        error: (error) => {},
      });
    } else if (this.user.id) {
      this.userService.update(this.user).subscribe({
        next: (response) => {
          this.user = response;
          // this.toastr.success('User updated successfully.');
          // ADD MATERIAL NOTIFICATIONS SNACKBAR
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
        this.user.avatar = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onColorChange(e: any) {
    this.user.color = e.target.value;
  }

  async onDeactivateClicked(e: any) {
    if (this.user) {
      this.user.isActive = false;

      this.userService.updateStatus(this.user).subscribe({
        next: (response) => {
          this.user = response;
          // this.toastr.success('User deactivated successfully.');
          // ADD MATERIAL NOTIFICATIONS SNACKBAR
        },
        error: (error) => {},
      });
    }
  }

  addUserSocialMedia(e: any) {
    this.isSocialMediaFormVisible.set(true);
    this.userSocialMediaDto = {
      id: Guid.createEmpty(),
      userId: Guid.createEmpty(),
    };
  }

  onSaveUserSocialMediaRowClicked(userSocialMedia: UserSocialMediaMapDto) {
    this.userSocialMediaDto = userSocialMedia;
    if (this.user.id) {
      this.userSocialMediaTempArray.push(this.userSocialMediaDto);
      this.user.userSocialMediaLinksMap.push(...this.userSocialMediaTempArray);
      this.isSocialMediaFormVisible.set(false);
    } else {
      this.userSocialMediaTempArray.push(this.userSocialMediaDto);
      this.isSocialMediaFormVisible.set(false);
    }
  }

  onClearSocialMediaFormClicked() {
    this.isSocialMediaFormVisible.set(false);
    this.userSocialMediaTempArray = [];
    this.userSocialMediaDto = {
      id: Guid.createEmpty(),
      userId: Guid.createEmpty(),
    };
  }

  clearRowKeys(row: any) {
    this.rowKeys.delete(row.id);
  }

  onSocialMediaSelectionChange(socialMedia: SocialMediaDto) {
    this.userSocialMediaDto.socialMediaId = socialMedia.id;
    this.userSocialMediaDto.userId = this.user.id;
    this.userSocialMediaDto.icon = socialMedia.icon;
    this.userSocialMediaDto.name = socialMedia.name;
  }

  onEditSocialMediaRowClicked(
    userSocialMedia: UserSocialMediaMapDto,
    index: number,
  ) {
    this.socialMediaRowIndex.set(index);
    this.rowKeys.add(userSocialMedia.id!);
  }

  isSocialMediaRowInEditMode(row: any, index: number) {
    return this.rowKeys.has(row.id) && this.socialMediaRowIndex() === index;
  }

  onChangePasswordClicked(e: any) {
    this.isChangePasswordPopupVisible.set(true);
  }

  onHideChangePasswordPopup(e: any) {
    this.isChangePasswordPopupVisible.set(false);
  }
}
