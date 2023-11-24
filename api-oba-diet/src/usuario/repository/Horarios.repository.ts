import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RemediosHorariosEntity, usuarios_has_horarios_remedios } from "../entity/horarios/RemediosHorario.entity";
import { RefeicoesHorariosEntity } from "../entity/horarios/RefeicoesHorario.entity";
import { UsuarioEntity } from "../entity/UsuarioEntity.entity";
import { Op } from "sequelize";
import { UUID } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../../auth/constants";



@Injectable()
export class HorariosRepository {

    constructor(
        private jwt : JwtService,

        @InjectModel(RemediosHorariosEntity)
        private remediosDB: typeof RemediosHorariosEntity,

        @InjectModel(usuarios_has_horarios_remedios)
        private hasRemedios: typeof usuarios_has_horarios_remedios,

        @InjectModel(RefeicoesHorariosEntity)
        private refeicoesDB: typeof RefeicoesHorariosEntity,

        @InjectModel(UsuarioEntity)
        private usuarioBD: typeof UsuarioEntity,
    ) { }



    async listarRemedios(id: string) {
        const horarios = await this.remediosDB.findAll(
            {

                include: [
                    {
                        model: usuarios_has_horarios_remedios,
                        required: true,
                        where: { usuarios_id: id },
                        attributes: [],
                        include: [{ model: UsuarioEntity, attributes: [] }],

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