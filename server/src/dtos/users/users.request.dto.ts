import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class UsersRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 128, {message: 'firstName must be between 1 and 128 characters'})
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 128, {message: 'lastName must be between 1 and 128 characters'})
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 128, {message: 'email must be between 1 and 128 characters'})
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 128, {message: 'password must be between 6 and 128 characters'})
    readonly password: string;
}
