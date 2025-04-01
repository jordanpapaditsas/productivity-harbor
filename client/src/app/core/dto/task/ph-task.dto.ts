import { Guid } from 'guid-typescript';

export class PhTaskDto {
  Id: Guid = Guid.createEmpty();
  SerialNumber: number = 0;
  Name: string = '';
  Notes?: string;
  CreatedAt: Date | string | number = new Date();
  CreatedById: Guid = Guid.createEmpty();
  UpdatedAt?: Date | string | number;
  UpdatedById?: Guid;
  StatusId: Guid = Guid.createEmpty();
}
