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


}