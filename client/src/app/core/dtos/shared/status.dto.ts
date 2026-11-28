import { Guid } from 'guid-typescript';

export interface StatusDto {
  id: Guid;
  name: string;
  color?: string;
  priority?: string;
}
