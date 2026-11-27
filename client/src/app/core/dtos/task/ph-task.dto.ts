import { Guid } from 'guid-typescript';

export interface PhTaskDto {
  id: Guid;
  serialNumber: number;
  description: string;
  notes?: string;
  createdAt: Date | string | number;
  createdById: Guid;
  updatedAt?: Date | string | number;
  updatedById?: Guid;
  statusId: Guid;
}
