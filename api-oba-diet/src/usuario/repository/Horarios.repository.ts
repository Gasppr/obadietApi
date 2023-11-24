import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RemediosHorariosEntity, usuarios_has_horarios_remedios } from "../entity/horarios/RemediosHorario.entity";
import { RefeicoesHorariosEntity, usuarios_has_horarios_refeicoes } from "../entity/horarios/RefeicoesHorario.entity";
import { UsuarioEntity } from "../entity/UsuarioEntity.entity";
import { Op } from "sequelize";
import { UUID } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../../auth/constants";
import { ReceitaEntity } from "../../receitas/entities/Receita.entity";



@Injectable()
export class HorariosRepository {

    constructor(
        private jwt : JwtService,

        @InjectModel(RemediosHorariosEntity)
        private remediosDB: typeof RemediosHorariosEntity,

        @InjectModel(usuarios_has_horarios_remedios)
        private hasRemedios: typeof usuarios_has_horarios_remedios,

        @InjectModel(usuarios_has_horarios_refeicoes)
        private hasRefeicoes: typeof usuarios_has_horarios_refeicoes,

        @InjectModel(RefeicoesHorariosEntity)
        private refeicoesDB: typeof RefeicoesHorariosEntity,

        @InjectModel(UsuarioEntity)
        private usuarioBD: typeof UsuarioEntity,

        @InjectModel(ReceitaEntity)
        private receitaDB: typeof ReceitaEntity,
    ) { }



    async listarReceitas(id: string) {
        const horarios = await this.refeicoesDB.findAll(
            {
                include: [
                    {
                        model: usuarios_has_horarios_refeicoes,
                        required: true,
                        where: { usuarios_id: id },
                        attributes: [],
                        include: [{ model: UsuarioEntity }, {model : ReceitaEntity}],

                    }
                ],
            }
        )

        return horarios
    }

    async criarHorarioPraRefeicoes(horario : RefeicoesHorariosEntity, idUsuario : string){
        await this.refeicoesDB.create(
           {
                idHorarios : horario.idHorarios,
                horario: horario.horario,
                tipo : horario.tipo,
                data: horario.data,
                qtdRepeteCada: horario.qtdRepeteCada,
                quandoRepeteCada: horario.quandoRepeteCada,
                diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
                qndTermina: horario.qndTermina,
                qndTerminaData: horario.qndTerminaData,
                qndTerminaHorario: horario.qndTerminaHorario,
                nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
                receita_id : horario.receita_id

           }
        )

       

        const horarioAchado = await this.refeicoesDB.findOne({
            where: {
                idHorarios : horario.idHorarios,
                horario: horario.horario,
                tipo : horario.tipo,
                data: horario.data,
                qtdRepeteCada: horario.qtdRepeteCada,
                quandoRepeteCada: horario.quandoRepeteCada,
                diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
                qndTermina: horario.qndTermina,
                qndTerminaData: horario.qndTerminaData,
                qndTerminaHorario: horario.qndTerminaHorario,
                nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
                receita_id : horario.receita_id
            }
        })

        const emailUsuario = await this.jwt.verifyAsync(idUsuario, {secret : jwtConstants.secret})

        const usuario = await this.usuarioBD.findOne({
            where:{
                email : emailUsuario.email 
            }
        })

        const receita  = await this.receitaDB.findOne({
            where:{
                id : horario.receita_id
            }
        })

     

        await this.hasRefeicoes.create({
            usuarios_id : usuario.id,
            horarios_refeicoes_idhorarios : horario.idHorarios,
            horarios_refeicoes_receita_id : horario.receita_id
        })

    
        return {mensagem : "Refeição marcada com sucesso!"}
    }

    async editarHorariosRefeicoes(horario : RefeicoesHorariosEntity){

        await this.refeicoesDB.update({
           
                horarios: horario.horario,
                tipo : horario.tipo,
                data: horario.data,
                qtdRepeteCada: horario.qtdRepeteCada,
                quandoRepeteCada: horario.quandoRepeteCada,
                diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
                qndTermina: horario.qndTermina,
                qndTerminaData: horario.qndTerminaData,
                qndTerminaHorario: horario.qndTerminaHorario,
                nmrRepeticoesTermino: horario.nmrRepeticoesTermino,
                receita_id : horario.receita_id
        },
        {
            where: {
                idHorarios : horario.idHorarios
            }
        }
        )

        return {mensagem : "Horario de refeição modificada com sucesso!"}
    }


    async deletarHorariosRefeicoes(id : number){
        await this.hasRefeicoes.destroy({
             where: {
                horarios_refeicoes_idhorarios : id
             }
         })
 
         await this.refeicoesDB.destroy(
             {where:
             {
             idHorarios : id
         }})
 
 
         return {mensagem : "Horario de remédio excluído com sucesso!"}
     }

    async listarRemedios(id: string) {
        const horarios = await this.remediosDB.findAll(
            {

                include: [
                    {
                        model: usuarios_has_horarios_refeicoes,
                        required: true,
                        where: { usuarios_id: id },
                        attributes: [],
                        include: [{ model: UsuarioEntity, attributes: [] }, ],

                    }
                ],
            }
        )

        return horarios
    }

    async criarHorarioPraRemedios(horario : RemediosHorariosEntity, idUsuario : string){
        await this.remediosDB.create(
           {
                data: horario.data,
                nomeRemedio: horario.nomeRemedio,
                repetir: horario.repetir,
                horarios: horario.horarios,
                qtdRepeteCada: horario.qtdRepeteCada,
                quandoRepeteCada: horario.quandoRepeteCada,
                diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
                qndTermina: horario.qndTermina,
                qndTerminaData: horario.qndTerminaData,
                qndTerminaHorario: horario.qndTerminaHorario,
                nmrRepeticoesTermino: horario.nmrRepeticoesTermino
           }
        )

       

        const horarioAchado = await this.remediosDB.findOne({
            where: {
                data: horario.data,
                nomeRemedio: horario.nomeRemedio,
                repetir: horario.repetir,
                horarios: horario.horarios,
                qtdRepeteCada: horario.qtdRepeteCada,
                quandoRepeteCada: horario.quandoRepeteCada,
                diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
                qndTermina: horario.qndTermina,
                qndTerminaData: horario.qndTerminaData,
                qndTerminaHorario: horario.qndTerminaHorario,
                nmrRepeticoesTermino: horario.nmrRepeticoesTermino
            }
        })

        const emailUsuario = await this.jwt.verifyAsync(idUsuario, {secret : jwtConstants.secret})

        const usuario = await this.usuarioBD.findOne({
            where:{
                email : emailUsuario.email 
            }
        })

     

        await this.hasRemedios.create({
            usuarios_id : usuario.id,
            horarios_remedios_idHorario : horarioAchado.idHorario
        })

    
        return {mensagem : "Remédio marcado com sucesso!"}
    }


    async editarHorariosRemedios(horario : RemediosHorariosEntity){

        await this.remediosDB.update({
            data: horario.data,
            nomeRemedio: horario.nomeRemedio,
            repetir: horario.repetir,
            horarios: horario.horarios,
            qtdRepeteCada: horario.qtdRepeteCada,
            quandoRepeteCada: horario.quandoRepeteCada,
            diasDaSemanaRepeticao: horario.diasDaSemanaRepeticao,
            qndTermina: horario.qndTermina,
            qndTerminaData: horario.qndTerminaData,
            qndTerminaHorario: horario.qndTerminaHorario,
            nmrRepeticoesTermino: horario.nmrRepeticoesTermino
        },
        {
            where: {
                idHorario : horario.idHorario
            }
        }
        )

        return {mensagem : "Horario de remédio modificado com sucesso!"}
    }


    async deletarHorariosRemedios(id : number){
       await this.hasRemedios.destroy({
            where: {
                horarios_remedios_idHorario : id
            }
        })

        await this.remediosDB.destroy(
            {where:
            {
            idHorario : id
        }})


        return {mensagem : "Horario de remédio excluído com sucesso!"}
    }

}