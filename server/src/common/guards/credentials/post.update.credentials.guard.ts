import {Injectable, CanActivate, ExecutionContext, NotFoundException} from '@nestjs/common';
import {UserRoleEnum} from '@enums/users/roles';
import {PostService} from '@entities/post/post.service';

@Injectable()
export class PostsGuard implements CanActivate {
    constructor(private postService: PostService) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const post = await this.postService.getById(req.params.id);

        if (!post) {
            throw new NotFoundException();
        }

        const isAdmin = req.user.userRole === UserRoleEnum.ADMIN;
        return isAdmin || (post.user.id === req.user.id);
    }
}
