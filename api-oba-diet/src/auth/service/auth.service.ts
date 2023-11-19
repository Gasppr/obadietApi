import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioEntity } from '../../usuario/entity/UsuarioEntity.entity';
import { UsuarioRepository } from '../../usuario/repository/Usuario.repository';
import { criptografia } from '../../usuario/criptografia';

@Injectable()
export class AuthService {

   constructor(

      private jwtService: JwtService,
      private cripto : criptografia,
      @InjectModel(UsuarioEntity)
      private usuarioBD: typeof UsuarioEntity) {

   }


   async verificarLogin(email: string, senha: string) {

      const user = await this.usuarioBD.findOne({
         where: {
            email: email,
         }
      })

      const senhaVerificada =  await this.cripto.verificarSenha(senha, user.senha)

      if (!senhaVerificada) {

         throw new UnauthorizedException("Email/senha incorretos")
      }

      const payload = { email: user.email, senha: user.senha }

      return {
         acess_token: await this.jwtService.signAsync(payload)
      }
   }


}
