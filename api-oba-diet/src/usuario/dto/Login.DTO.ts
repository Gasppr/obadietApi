import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto{
    

    @IsNotEmpty({"message" : "O campo não deve está vazio"})
    @IsEmail()
    email: String

    @IsNotEmpty()
    @IsString()
    senha: String
}