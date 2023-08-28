
export enum sexoEnum{
    "MASCULINO" = "Masculino",
    "FEMININO" = "Feminino",
    "NEUTRO" = "Neutro"
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