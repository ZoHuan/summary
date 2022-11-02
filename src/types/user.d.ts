export interface UserInfoType {
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

export interface MenuType {
  name: string;
  path: string;
  redirect?: string;
  parentId: number;
  id: number;
  component: string;
  meta: MetaType;
  children?: Array<MenuType>;
}

export interface MetaType {
  icon: string;
  title: string;
  hidden: boolean;
  affix?: boolean;
  noCache?: string;
  url?: string;
  permissionList?: string;
  internalOrExternal?: boolean;
}

export interface RoleType {
  id: string;
  name: string;
  describe: string;
  status: number;
  creatorId: string;
  createTime: number;
  deleted: number;
  permissions: Array<PermissionsType>;
}

export interface PermissionsType {
  roleId: string;
  permissionId: string;
  permissionName: string;
  actions: string;
  actionEntitySet: Array<ActionEntitySetType>;
  actionList: Array<string>;
  dataAccess: null;
}

export interface ActionEntitySetType {
  action: string;
  describe: string;
  defaultCheck: boolean;
}

export interface TagsType {
  fullPath: string;
  path: string;
  name: RouteRecordName | undefined;
  meta: RouteMeta;
}

export interface ContextMenuType {
  icon: string;
  text: string;
  disabled: () => boolean;
  select: () => void;
}
