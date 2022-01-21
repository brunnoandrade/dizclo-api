import {
  Controller,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

import { CreatePartnerTestmonialContract } from 'src/modules/backoffice/contracts/partner/create-partner-testmonials.contract';
import { UpdatePartnerTestmonialContract } from 'src/modules/backoffice/contracts/partner/update-partner-testmonials.contract';

import { PartnerTestmonial } from 'src/modules/backoffice/models/partner/testmonial';

import { PartnerTestmonialService } from 'src/modules/backoffice/services/partner/testmonial.service';

@Controller('v1/partners/testmonials')
export class PartnerTestmonialController {
  constructor(private readonly service: PartnerTestmonialService) {}

  @Post(':username')
  @UseInterceptors(
    new ValidatorInterceptor(new CreatePartnerTestmonialContract()),
  )
  async createPet(
    @Param('username') username,
    @Body() model: PartnerTestmonial,
  ) {
    try {
      await this.service.create(username, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto('Não foi possível adicionar!', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':username/:id')
  @UseInterceptors(
    new ValidatorInterceptor(new UpdatePartnerTestmonialContract()),
  )
  async updatePet(
    @Param('username') username,
    @Param('id') id,
    @Body() model: PartnerTestmonial,
  ) {
    try {
      await this.service.update(username, id, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto('Não foi possível atualizar!', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
