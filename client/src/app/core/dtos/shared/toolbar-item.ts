export interface ToolbarItem {
  id: number;
  icon: string;
  label?: string;
  visible: boolean;
  position?: string;
  onItemClick: (event: MouseEvent) => void;
}
