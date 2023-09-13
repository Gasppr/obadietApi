import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from 'src/usuario/repository/Usuario.repository';

@Injectable()
export class AuthService {

    constructor(private usuarioRepository : UsuarioRepository, private jwtService : JwtService){

    }


    async verificarLogin(email: String, pass : String){

        const user = await this.usuarioRepository.FindOne(email, pass)
         if(user?.senha != pass){

            throw new UnauthorizedException("Email/senha incorretos")
         }

         const payload = {email : user.email, pass : user.senha}
        
         return{
            acess_token : await this.jwtService.signAsync(payload)
         }
    }


}
