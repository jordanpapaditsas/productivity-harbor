import { Guid } from 'guid-typescript';

export class StatusDto {
  Id!: Guid;
  Name: string = '';
  Color: string = '';
  Priority?: string;
}
