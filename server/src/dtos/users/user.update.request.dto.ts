import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';

export class UsersUpdateRequestDto {
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
}
