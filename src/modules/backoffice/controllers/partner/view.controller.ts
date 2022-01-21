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

import { CreatePartnerViewContract } from 'src/modules/backoffice/contracts/partner/create-partner-views.contract';
import { UpdatePartnerViewContract } from 'src/modules/backoffice/contracts/partner/update-partner-views.contract';

import { PartnerView } from 'src/modules/backoffice/models/partner/view';

import { PartnerViewService } from 'src/modules/backoffice/services/partner/view.service';

@Controller('v1/partners/views')
export class PartnerViewController {
  constructor(private readonly service: PartnerViewService) {}

  @Post(':username')
  @UseInterceptors(new ValidatorInterceptor(new CreatePartnerViewContract()))
  async createPet(@Param('username') username, @Body() model: PartnerView) {
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
  @UseInterceptors(new ValidatorInterceptor(new UpdatePartnerViewContract()))
  async updatePet(
    @Param('username') username,
    @Param('id') id,
    @Body() model: PartnerView,
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
