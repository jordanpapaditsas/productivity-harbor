import {
  Component,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PhContainerComponent } from '../../../../shared/components/ph-container/ph-container.component';
import { PhDataGridComponent } from '../../../../shared/components/ph-data-grid/ph-data-grid.component';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';
import { SocialMediaDto } from '../../../../core/dtos/shared/social-media.dto';
import { Column } from '../../../../core/dtos/shared/column';
import { SocialMediaService } from './social-media.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PhContainerComponent, PhDataGridComponent, PhToolbarComponent],
})
export class SocialMediaComponent implements OnInit {
  dataSource: any;
  columns = signal<Column[]>([]);
  title = signal<string>('Social Media');
  socialMediaService = inject(SocialMediaService);
  socialMedia: SocialMediaDto = {
    id: Guid.createEmpty(),
    name: '',
  };

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
        dataField: 'id',
        dataType: 'string',
        label: 'Id',
        visible: true,
        allowEditing: false,
      },
      {
        dataField: 'name',
        dataType: 'string',
        label: 'Name',
        visible: true,
        allowEditing: true,
      },
      {
        dataField: 'icon',
        dataType: 'string',
        label: 'Icon',
        visible: true,
        allowEditing: true,
      },
    );
  }

  onInsertRow(socialMedia: SocialMediaDto) {
    this.socialMedia = {
      id: Guid.createEmpty(),
      name: '',
    };
  }
  onEditRow(socialMedia: SocialMediaDto) {}
  onSaveRow(socialMedia: SocialMediaDto) {
    if (!socialMedia.id) {
      this.socialMediaService
        .createSocialMedia(socialMedia)
        .subscribe((response: SocialMediaDto) => {
          this.socialMedia = response;

          this.getDataSource();
        });
    } else if (socialMedia.id) {
      this.socialMediaService
        .updateSocialMedia(socialMedia)
        .subscribe((response: SocialMediaDto) => {
          this.socialMedia = response;

          this.getDataSource();
        });
    }
  }
  onDeleteRow(socialMedia: SocialMediaDto) {
    if (socialMedia.id) {
      this.socialMediaService
        .deleteSocialMediaById(socialMedia.id)
        .subscribe((response) => {
          this.getDataSource();
        });
    }
  }
}
