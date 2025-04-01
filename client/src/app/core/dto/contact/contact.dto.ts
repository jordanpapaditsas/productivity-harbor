import { Guid } from 'guid-typescript';
import { StageStatusEnum } from '../../enums/contact/stage-status.enum';
import { ContactTypeEnum } from '../../enums/contact/contact-type.enum';

export class ContactDto {
  Id: Guid = Guid.createEmpty();
  Name: string = '';
  Notes?: string;
  Email?: string;
  Phone1?: string;
  Phone2?: string;
  Phone3?: string;
  ContactType: ContactTypeEnum = ContactTypeEnum.None;
  StageStatus?: StageStatusEnum;
}
