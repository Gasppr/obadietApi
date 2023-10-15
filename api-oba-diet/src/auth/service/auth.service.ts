import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioEntity } from 'src/usuario/entity/UsuarioEntity.entity';
import { UsuarioRepository } from 'src/usuario/repository/Usuario.repository';

@Injectable()
export class AuthService {

    constructor(
      
      private jwtService : JwtService,
      
      @InjectModel(UsuarioEntity)
      private usuarioBD: typeof UsuarioEntity ){

    }


    async verificarLogin(email: String, senha : String){

        const user = await this.usuarioBD.findOne({
         where:{
            email : email,
            senha : senha
         }
        })
         if(user?.senha != senha){

            throw new UnauthorizedException("Email/senha incorretos")
         }

         const payload = {email : user.email, senha : user.senha}
        
         return{
            acess_token : await this.jwtService.signAsync(payload)
         }
    }


}
