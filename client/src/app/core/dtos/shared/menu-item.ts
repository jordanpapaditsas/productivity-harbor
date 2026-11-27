export interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
}
