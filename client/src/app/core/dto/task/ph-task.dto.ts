import { Guid } from 'guid-typescript';

export class PhTaskDto {
  Id: Guid = Guid.createEmpty();
  SerialNumber: number = 0;
  Name: string = '';
  Notes?: string;
}
