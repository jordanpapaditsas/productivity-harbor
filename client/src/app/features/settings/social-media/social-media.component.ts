import { Component, inject, OnInit, signal } from '@angular/core';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';
import { PhDataGridComponent } from '../../../shared/components/ph-data-grid/ph-data-grid.component';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';
import { SocialMediaDto } from '../../../core/dto/user/social-media.dto';
import { Column } from '../../../core/interfaces/column';
import { SocialMediaService } from './social-media.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css'],
  imports: [PhContainerComponent, PhDataGridComponent, PhToolbarComponent],
})
export class SocialMediaComponent implements OnInit {
  dataSource: any;
  columns = signal<Column[]>([]);
  title = signal<string>('Social Media');
  socialMediaService = inject(SocialMediaService);
  socialMedia: SocialMediaDto = new SocialMediaDto();

  ngOnInit() {
    this.getDataSource();
    this.initializeColumns();
  }

  getDataSource() {
    this.socialMediaService
      .getAllSocialMedia()
      .subscribe((response: SocialMediaDto[]) => {
        this.dataSource = response;
      });
  }

  initializeColumns() {
    this.columns().push(
      {
        dataField: 'Id',
        dataType: 'string',
        label: 'Id',
        visible: true,
        allowEditing: false,
      },
      {
        dataField: 'Name',
        dataType: 'string',
        label: 'Name',
        visible: true,
        allowEditing: true,
      },
      {
        dataField: 'Icon',
        dataType: 'string',
        label: 'Icon',
        visible: true,
        allowEditing: true,
      }
    );
  }

  onInsertRow(socialMedia: SocialMediaDto) {
    this.socialMedia = new SocialMediaDto();
  }
  onEditRow(socialMedia: SocialMediaDto) {
    debugger;
  }
  onSaveRow(socialMedia: SocialMediaDto) {
    debugger;
    if (!socialMedia.Id) {
      this.socialMediaService
        .createSocialMedia(socialMedia)
        .subscribe((response: SocialMediaDto) => {
          this.socialMedia = response;

          this.getDataSource();
        });
    } else if (socialMedia.Id) {
      this.socialMediaService
        .updateSocialMedia(socialMedia)
        .subscribe((response: SocialMediaDto) => {
          this.socialMedia = response;

          this.getDataSource();
        });
    }
  }
  onDeleteRow(socialMedia: SocialMediaDto) {
    debugger;
    if (socialMedia.Id) {
      this.socialMediaService
        .deleteSocialMediaById(socialMedia.Id)
        .subscribe((response) => {
          this.getDataSource();
        });
    }
  }
}
