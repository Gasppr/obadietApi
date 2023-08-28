import { Injectable } from "@nestjs/common";
import { UsuarioEntity, sexoEnum } from "../entity/UsuarioEntity.entity";
import { LoginEntity } from "../entity/LoginEntity.entity";


@Injectable()
export class UsuarioRepository{


    
    private  _usuario : UsuarioEntity[] = [] 
    

    
      addUser( user : UsuarioEntity){
            let emailVerify
            emailVerify = this.verifyEmail(user.email)
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




    verifyLogin(email: String, pass : String){

        let existsUser = this._usuario.find(n => n.email == email && n.senha == pass)

        //retorna true se o usuário existir assim podendo confirma a entrada no aplicativo
        //retorna false se o usuário não existir 
        return existsUser
    }

    
    verifyEmail( email: String){

        const emailExists =  this._usuario.find( n => n.email == email)

        //retorna true se email existir
        //retorna falso se não existir
        return emailExists
       
    }


    showAllUsers(){
       return this._usuario
    }


}