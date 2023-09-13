
export enum sexoEnum{
    "MASCULINO" = "Masculino",
    "FEMININO" = "Feminino"
}

export class UsuarioEntity{

    nome : String 
    sobrenome : String
    email: String
    sexo: sexoEnum
    idade : number
    peso : number
    altura : number
    senha: String
    
}