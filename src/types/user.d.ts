// 用户信息
export interface UserType {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar: string;
  status: number;
  telephone: string;
  lastLoginIp: string;
  lastLoginTime: number;
  creatorId: string;
  createTime: number;
  merchantCode: string;
  deleted: number;
  roleId: string;
  role: RoleType;
}

// 导航菜单
export interface MenuType {
  name: string;
  path: string;
  parentId: number | string;
  id: number;
  component: string;
  redirect?: string;
  meta: MetaType;
  children?: Array<MenuType>;
}

// 导航菜单元信息
export interface MetaType {
  icon: string;
  title: string;
  hidden: boolean;
  hideChildren?: boolean;
  affix?: boolean;
  cache?: boolean;
  url?: string;
  permissionList?: string;
  internalOrExternal?: boolean;
}

// 部门信息
export interface DepartmentType {
  parentId: number | string;
  id?: number;
  code: string;
  name: string;
  children?: Array<DepartmentType>;
}

// 角色信息
export interface RoleType {
  id: string;
  name: string;
  describe: string;
  status: number;
  creatorId: string;
  createTime: number;
  deleted: number;
  permissions: Array<number>;
}

// 权限信息
export interface PermissionsType {
  roleId: string;
  permissionId: string;
  permissionName: string;
  actions: string;
  actionEntitySet: Array<ActionEntitySetType>;
  actionList: Array<string>;
  dataAccess: null;
}

// 权限操作信息
export interface ActionEntitySetType {
  action: string;
  describe: string;
  defaultCheck: boolean;
}

// 标签信息
export interface TagsType {
  fullPath: string;
  path: string;
  name: RouteRecordName | undefined;
  meta: RouteMeta;
}

// 标签操作信息
export interface ContextMenuType {
  icon: string;
  text: string;
  disabled: () => boolean;
  select: () => void;
}
