import {
    BadRequestException,
    ConflictException,
    Controller,
    UseGuards,
    HttpCode,
    Body,
    Post,
    Get,
    Req
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {StatusCodes} from 'http-status-codes';

import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {UsersRequestDto, UsersResponseDto} from '@dtos/users';
import {AuthService} from '@entities/auth/auth.service';
import {UsersService} from '@entities/user/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {
    }

    @Post('sign-in')
    @UseGuards(AuthGuard('local'))
    async signIn(@Req() req) {
        return this.authService.login(req.user);
    }

    @Post('sign-up')
    @HttpCode(StatusCodes.CREATED)
    async signUp(@Body() data: UsersRequestDto): Promise<UsersResponseDto> {
        try {
            const user = await this.userService.create(data);
            return new UsersResponseDto(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User with this email already exists');
            } else {
                throw new BadRequestException();
            }
        }
    }

    @Get('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req) {
        const {id} = req.user;
        const user = await this.authService.logout(id);
        return new UsersResponseDto(user);
    }
}
