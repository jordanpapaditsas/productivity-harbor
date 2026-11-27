import { Guid } from 'guid-typescript';

export interface ModuleDto {
  id: Guid;
  parentId?: Guid;
  key: string;
  label: string;
  icon: string;
  route: string;
  sortOrder?: number;
  isVisible: boolean;
  subModules?: ModuleDto[];
}
