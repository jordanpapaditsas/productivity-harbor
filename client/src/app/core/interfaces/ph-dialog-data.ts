import { DialogTypeEnum } from '../enums/dialog/dialog-type.enum';

export interface PhDialogData {
  Title: string;
  Message: string;
  ConfirmText: string;
  CancelText: string;
  Type?: DialogTypeEnum;
}
