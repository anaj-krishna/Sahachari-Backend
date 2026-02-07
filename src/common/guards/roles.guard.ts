import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AccountStatus } from '../enums/account-status.enum';
// “Is this logged-in user allowed to access this API or not?”
interface JwtUser {
  role: Role;
  status: AccountStatus;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as JwtUser;

    if (!user) return false;
    if (user.status !== AccountStatus.ACTIVE) return false;
    if (!requiredRoles || requiredRoles.length === 0) return true;

    return requiredRoles.includes(user.role);
  }
}
