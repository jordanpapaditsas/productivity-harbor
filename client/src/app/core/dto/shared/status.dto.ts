import { Guid } from 'guid-typescript';

export class StatusDto {
  Id: Guid = Guid.createEmpty();
  Name: string = '';
  Color: string = '';
  Priority?: string;
}
