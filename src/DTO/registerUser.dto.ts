import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";


export class RegisterUserDto {
    
    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    @MinLength(6) @MaxLength(12)
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,12}$/, 
    {message: "Password is to weak, please choose a stronger password between 6 to 12 characters long. Password must contain one lower case and one upper case letter."})
    password: string;
}