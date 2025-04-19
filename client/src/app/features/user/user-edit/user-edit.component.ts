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
  isUserInEditMode = signal<boolean>(false);
  isSocialMediaFormVisible = signal<boolean>(false);
  socialMediaRowIndex = signal<number>(0);
  rowKeys: Set<Guid> = new Set();

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
      if (!this.user.Phone) {
        this.user.Phone = { Home: '', Mobile: '', Work: '' };
      }

      if (!this.user.Address) {
        this.user.Address = { Street: '', City: '', Zip: '' };
      }
    });
  }

  onExitClicked(e: any) {
    this.exitScreen.emit(e);
  }

  onSaveClicked(e: any) {
    if (!this.user.Id) {
      this.userService.createUser(this.user).subscribe((response) => {
        this.user = response;
        //TODO Toastr
      });
    } else if (this.user.Id) {
      this.userService.updateUser(this.user).subscribe((response) => {
        this.user = response;
        //TODO Toastr
      });
    }
  }

  onEditClicked(e: any) {
    this.isUserInEditMode.set(!this.isUserInEditMode());
    //TODO Fix the view mode interface and the edit mode interface
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
    this.isSocialMediaFormVisible.set(true);
    if (this.isSocialMediaFormVisible()) {
      this.userSocialMedia = new UserSocialMediaMapDto();
      this.userSocialMediaArray.push(this.userSocialMedia);
    }
  }

  onClearSocialMediaFormClicked() {
    this.isSocialMediaFormVisible.set(false);
    this.userSocialMediaArray = [];
    this.userSocialMedia = new UserSocialMediaMapDto();
  }

  clearRowKeys(row: any) {
    this.rowKeys.delete(row.Id);
  }

  async onSaveUserSocialMediaRowClicked(
    userSocialMedia: UserSocialMediaMapDto,
    index: number
  ) {
    if (!userSocialMedia.Url) {
      let result = await this.dialogService.alertDialog(
        'Warning Message',
        'Please type a correct Url for your social media.',
        DialogTypeEnum.Danger
      );
      return result;
    }

    debugger;
    if (!userSocialMedia.Id) {
      this.userSocialMediaService
        .createUserSocialMediaMap(userSocialMedia)
        .subscribe((response) => {
          this.userSocialMedia = response;

          this.user.UserSocialMediaLinksMap.push(this.userSocialMedia);
          //TODO Toastr?

          // this.getUserDataSource();
          this.onClearSocialMediaFormClicked();
        });
    } else {
      this.userSocialMediaService
        .updateUserSocialMediaMap(userSocialMedia)
        .subscribe((response) => {
          this.userSocialMedia = response;
          //TODO Toastr?

          this.rowKeys.delete(this.userSocialMedia.Id!);
          this.clearRowKeys(this.userSocialMedia.Id);
          // this.getUserDataSource();
          this.onClearSocialMediaFormClicked();
        });
    }
  }

  onSocialMediaSelectionChange(socialMedia: SocialMediaDto) {
    this.userSocialMedia.SocialMediaId = socialMedia.Id;
    this.userSocialMedia.UserId = this.user.Id;
    this.userSocialMedia.Icon = socialMedia.Icon;
    this.userSocialMedia.Name = socialMedia.Name;
  }

  onEditSocialMediaRowClicked(
    userSocialMedia: UserSocialMediaMapDto,
    index: number
  ) {
    this.socialMediaRowIndex.set(index);
    this.rowKeys.add(userSocialMedia.Id!);
  }

  async onDeleteSocialMediaRowClicked(
    userSocialMedia: UserSocialMediaMapDto,
    index: number
  ) {
    let result = await this.dialogService.confirmDialog(
      'Warning Message',
      'Are you sure you want to delete record?',
      DialogTypeEnum.Danger
    );

    if (result) {
      this.userSocialMediaService
        .deleteUserSocialMediaMapById(userSocialMedia.Id!)
        .subscribe((response) => {
          //TODO toastr
          this.getUserDataSource();
        });
    }
  }

  isSocialMediaRowInEditMode(row: any, index: number) {
    return this.rowKeys.has(row.Id) && this.socialMediaRowIndex() === index;
  }
}
