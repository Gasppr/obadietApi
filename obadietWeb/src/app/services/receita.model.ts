export interface ReceitaModel {
    id: number 
    nome: string 
    ingredientes: string 
    modoPreparo: string 
    imagem: string 

    doencas: Doenca[]
    restricoes: restricao[]
    categorias: categoria[]

}

interface Doenca {
    idDoenca: number
    nomeDoenca: string 
}

interface restricao {
    idRestricao : number 
    nomeRestricao : string
}

interface categoria{
    idCategoria : string
    nomeCategoria : string
}