import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioEntity } from "../entity/UsuarioEntity.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { InjectModel } from "@nestjs/sequelize";


// Nossa service 

@Injectable()
export class UsuarioRepository{

    constructor(
        private jwtService : JwtService, private configService : ConfigService,
        private sequelize: Sequelize,

        @InjectModel(UsuarioEntity)
        private usuarioBD: typeof UsuarioEntity,
        ){}
    



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




        ProcurarPorID(id: string ): Promise<UsuarioEntity> {
            return this.usuarioBD.findOne({
              where: {
                id,
              },
            });
          }
        
        

        async ProcurarTodos(): Promise<UsuarioEntity[]> {
            return this.usuarioBD.findAll(); ;
          }

    async verificarLogin(email: String, pass : String){

        const user = await this.usuarioBD.findOne({
          where:{
            email
          }
        })

         if(user?.senha != pass){

            throw new UnauthorizedException("Este usuário não existe")
         }

         const payload = {id : user.id, pass : user.senha}
        
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


