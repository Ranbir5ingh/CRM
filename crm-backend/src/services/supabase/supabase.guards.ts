import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { Observable } from 'rxjs';
import { roles } from './supabse.constants';

@Injectable()
export class Adminguard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const user = this.supabaseService.getUserFromToken(token);
    request.user = user;
    if (user.role !== roles.ADMIN)
      throw new UnauthorizedException('User is not an admin');
    return true;
  }
}
@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const user = this.supabaseService.getUserFromToken(token);
    request.user = user;

    if (
      user.role == roles.EMPLOYEE ||
      user.role == roles.MANAGER ||
      user.role == roles.ADMIN
    ) {
      return true;
    }

    throw new UnauthorizedException('User is not an employee');
  }
}
@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const user = this.supabaseService.getUserFromToken(token);
    request.user = user;
    if (user.role == roles.MANAGER || user.role == roles.ADMIN) {
      return true;
    }
    throw new UnauthorizedException('User is not an manager');
  }
}

@Injectable()
export class OpenGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const user = this.supabaseService.getUserFromToken(token);
    request.user = user;
    return true;
  }
}
