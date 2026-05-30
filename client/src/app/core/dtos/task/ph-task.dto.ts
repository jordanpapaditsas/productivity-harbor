import { Guid } from 'guid-typescript';

export class PhTaskDto {
  Id!: Guid;
  SerialNumber: number = 0;
  Description: string = '';
  Notes?: string;
  CreatedAt: Date | string | number = new Date();
  CreatedById!: Guid;
  UpdatedAt?: Date | string | number;
  UpdatedById?: Guid;
  StatusId!: Guid;
}
