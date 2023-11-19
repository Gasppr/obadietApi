import { Module } from '@nestjs/common';
import { UsuarioRepository } from './repository/Usuario.repository';
import { UsuarioController } from './usuario.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes } from './entity/UsuarioEntity.entity';
import { RestricaoEntity } from '../receitas/entities/Restricao.entity';
import { DoencaEntity } from '../receitas/entities/Doenca.entity';
import { criptografia } from './criptografia';

@Module({
  imports: [
    UsuarioModule,
    criptografia,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),

    SequelizeModule.forFeature([UsuarioEntity, RestricaoEntity, DoencaEntity, Usuario_Has_Doencas, Usuario_Has_Restricoes]),
  ],

  providers: [UsuarioRepository, JwtService, criptografia],
  exports: [UsuarioRepository],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
