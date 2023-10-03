import { Module } from '@nestjs/common';
import { UsuarioRepository } from './repository/Usuario.repository';
import { UsuarioController } from './usuario.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioEntity } from './entity/UsuarioEntity.entity';

@Module({

    imports: [
        UsuarioModule,
        JwtModule.register({
          global: true,
         // secret: env.development.process.acess_token,
          signOptions: { expiresIn: '60s' },
        }),
        
        SequelizeModule.forFeature([UsuarioEntity]),
      ],

    providers:[UsuarioRepository, JwtService,],
    exports:[UsuarioRepository,],
    controllers: [UsuarioController]
})
export class UsuarioModule {}
