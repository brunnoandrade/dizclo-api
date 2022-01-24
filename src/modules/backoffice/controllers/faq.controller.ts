import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  CacheInterceptor,
  Delete,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreateFAQContract } from 'src/modules/backoffice/contracts/faq/create-faq.contract';
import { UpdateFAQContract } from 'src/modules/backoffice/contracts/faq/update-faq.contract';

import { FAQ } from 'src/modules/backoffice/models/faq.model';
import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

import { CreateFAQDto } from 'src/modules/backoffice/dtos/faq/create-faq.dto';
import { UpdateFAQDto } from 'src/modules/backoffice/dtos/faq/update-faq.dto';

import { FAQService } from 'src/modules/backoffice/services/faq.service';

@Controller('v1/faqs')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateFAQContract()))
  async post(@Body() model: CreateFAQDto) {
    try {
      const data = new FAQ(model.title, model.description);
      await this.faqService.create(data);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @UseInterceptors(new ValidatorInterceptor(new UpdateFAQContract()))
  async update(@Param('id') id, @Body() model: UpdateFAQDto) {
    try {
      await this.faqService.update(id, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar seus dados',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll() {
    const data = await this.faqService.findAll();
    return new ResultDto(null, true, data, null);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    try {
      const data = await this.faqService.delete(id);
      return new ResultDto(null, true, data, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar seus dados',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
