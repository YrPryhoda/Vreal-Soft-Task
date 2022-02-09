import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {UserRoleEnum} from '@enums/users/roles';

@Injectable()
export class UsersGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const isAdmin = req.user.userRole === UserRoleEnum.ADMIN;
        const reqId = Number(req.params.id);

        return isAdmin || (reqId === req.user.id);
    }
}
