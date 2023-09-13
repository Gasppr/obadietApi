import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioEntity, sexoEnum } from "../entity/UsuarioEntity.entity";
import { JwtService } from "@nestjs/jwt";
import { promises } from "dns";



@Injectable()
export class UsuarioRepository{

    constructor(private jwtService : JwtService){}
    
    private  _usuario : UsuarioEntity[] = [] 
    
      AdicionarUsuario( user : UsuarioEntity){

        let emailVerify
        emailVerify = this.verificarEmail(user.email)
       
        if(emailVerify){
            return "Email já existe :("
        }
        else
        {
            this._usuario.push(user)
            return  {
                 message: "Usuário cadastrado com sucesso",
                 data: user.email,
             }
        }
      
        }

        async FindOne(email: String , pass : String) : Promise<UsuarioEntity | undefined>{


            const existsUser = this._usuario.find(n => n.email == email && n.senha == pass)

            return existsUser
        }

    async verificarLogin(email: String, pass : String){

        const user = await this.FindOne(email, pass)
         if(user?.senha != pass){

            throw new UnauthorizedException("Este usuário não existe")
         }

         const payload = {id : user.idade, pass : user.senha}
        
         return{
            acess_token : await this.jwtService.signAsync(payload)
         }
    }


    

    
    verificarEmail( email: String){

        const emailExists =  this._usuario.find( n => n.email == email)

        //retorna true se email existir
        //retorna falso se não existir
        return emailExists
       
    }


    mostrarTodosUsuarios(){
       return this._usuario
    }


}