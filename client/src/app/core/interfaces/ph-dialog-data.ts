import { DialogTypeEnum } from '../enums/dialog/dialog-type.enum';

export interface PhDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type?: DialogTypeEnum;
}
