import {
    Get,
    Put,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    Controller,
    ConflictException,
    BadRequestException,
    NotFoundException,
    UseGuards, Req
} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';

import {UsersService} from '@entities/user/users.service';
import {JwtAuthGuard} from '@common/guards/auth/jwt-auth.guard';
import {UsersRequestDto, UsersResponseDto, UsersUpdateRequestDto} from '@dtos/users';
import {UsersGuard} from '@common/guards/credentials/user.update.credentials.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Req() req): Promise<UsersResponseDto> {
        const {id} = req.user;
        const user = await this.userService.getById(id);
        return new UsersResponseDto(user);
    }

    @Get()
    async findAll(): Promise<UsersResponseDto[]> {
        const users = await this.userService.getAll();
        return users.map((user) => new UsersResponseDto(user));
    }

    @Get(':userId')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('userId') id: number): Promise<UsersResponseDto> {
        const user = await this.userService.getById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return new UsersResponseDto(user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    async create(@Body() data: UsersRequestDto): Promise<UsersResponseDto> {
        try {
            const user = await this.userService.create(data);
            return new UsersResponseDto(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User with this email already exists');
            } else {
                throw new BadRequestException(error.message);
            }
        }
    }

    @Put(':id')
    @UseGuards(UsersGuard)
    @UseGuards(JwtAuthGuard)
    @HttpCode(StatusCodes.CREATED)
    async update(
        @Body() data: UsersUpdateRequestDto,
        @Param('id') id: number
    ): Promise<UsersResponseDto> {
        const updatedUser = await this.userService.update(id, data);
        return new UsersResponseDto(updatedUser);
    }

    @Delete(':id')
    @UseGuards(UsersGuard)
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number): Promise<UsersResponseDto> {
        const user = await this.userService.delete(id);
        return new UsersResponseDto(user);
    }
}
