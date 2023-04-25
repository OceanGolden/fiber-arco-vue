import type { MenuRecord } from '@/api/system/menu/type';
import type { StaffRecord } from '@/api/system/staff/type';

export interface UserState {
  staff: Partial<StaffRecord>;
  menus: MenuRecord[];
  permissions: string[];
}
