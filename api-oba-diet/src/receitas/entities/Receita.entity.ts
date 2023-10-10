import { DoencaEntity } from "./Doenca.entity"
import { RestricaoEntity } from "./Restricao.entity"

export class ReceitaEntity {
    id : number
    restricoes: RestricaoEntity[]
    doencas: DoencaEntity[]
    nome : string
    ingredientes : string
    modoPreparo : string
}