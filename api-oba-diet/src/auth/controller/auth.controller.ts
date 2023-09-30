import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from 'src/usuario/dto/Login.DTO';
import { AuthGuard } from '../guard/auth.guard';
import { IsPublic } from '../guard/isPublic.decorator';

@Controller('obadiet/auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @IsPublic()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginEntity: LoginDto) {
      return this.authService.verificarLogin(loginEntity.email, loginEntity.senha);
    }

    
    @UseGuards(AuthGuard)
    @Get('perfil')
    pegarUsuario(@Request() req){
      return req.perfil;
    }
}
