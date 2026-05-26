import type { Permission, UserRole } from '@apex/types'

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'leads:read', 'leads:write', 'leads:delete', 'leads:export',
    'crm:read', 'crm:write',
    'billing:read', 'billing:write',
    'analytics:read', 'analytics:export',
    'automations:manage',
    'content:read', 'content:write',
    'tenants:manage', 'tenants:billing',
    'users:manage',
    'settings:manage',
  ],
  TENANT_ADMIN: [
    'leads:read', 'leads:write', 'leads:delete', 'leads:export',
    'crm:read', 'crm:write',
    'billing:read', 'billing:write',
    'analytics:read', 'analytics:export',
    'automations:manage',
    'content:read', 'content:write',
    'users:manage',
    'settings:manage',
  ],
  STAFF: [
    'leads:read', 'leads:write',
    'crm:read', 'crm:write',
    'analytics:read',
    'content:read',
  ],
  CLIENT: [
    'billing:read',
    'content:read',
  ],
  GUEST: [],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? []
}

export function assertPermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Role "${role}" does not have permission "${permission}"`)
  }
}
