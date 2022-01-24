import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  UseInterceptors,
  Body,
  HttpException,
  HttpStatus,
  CacheInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';

import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { AuthService } from 'src/shared/services/auth.service';
import { AccountService } from 'src/modules/backoffice/services/account.service';

import { AuthenticateDto } from 'src/modules/backoffice/dtos/account/authenticate.dto';
import { ResetPasswordDto } from 'src/modules/backoffice/dtos/account/reset-password.dto';
import { ChangePasswordDto } from 'src/modules/backoffice/dtos/account/change-password.dto';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

import { ChangePasswordAccountContract } from 'src/modules/backoffice/contracts/account/change-password-account.contract';

import { Guid } from 'guid-typescript';
import { Md5 } from 'md5-typescript';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    const users = await this.accountService.findAll();
    return new ResultDto(null, true, users, null);
  }

  // Autenticar
  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
    const customer = await this.accountService.authenticate(
      model.username,
      model.password,
    );

    // Caso não encontre o usuário
    if (!customer)
      throw new HttpException(
        new ResultDto('Usuário ou senha inválidos', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );

    // Caso o usuário esteja inativo
    if (!customer.user.active)
      throw new HttpException(
        new ResultDto('Usuário inativo', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );

    // Gera o token
    const token = await this.authService.createToken(
      customer.username,
      customer.email,
      '',
      customer.user.roles,
    );
    return new ResultDto(null, true, token, null);
  }

  // Resetar a senha
  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      // TODO: Enviar E-mail com a senha

      const password = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');
      await this.accountService.update(model.username, { password: password });
      return new ResultDto(
        'Uma nova senha foi enviada para seu E-mail',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível restaurar sua senha',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Alterar Senha
  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    new ValidatorInterceptor(new ChangePasswordAccountContract()),
  )
  async changePassword(
    @Req() request,
    @Body() model: ChangePasswordDto,
  ): Promise<any> {
    try {
      const password = await Md5.init(
        `${model.password}${process.env.SALT_KEY}`,
      );
      await this.accountService.update(request.user.username, {
        password,
      });
      return new ResultDto(
        'Sua senha foi alterada com sucesso!',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto('Não foi possível alterar sua senha', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Refresh Token
  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request): Promise<any> {
    // Gera o token
    const token = await this.authService.createToken(
      request.user.username,
      request.user.email,
      request.user.image,
      request.user.roles,
    );
    return new ResultDto(null, true, token, null);
  }
}
