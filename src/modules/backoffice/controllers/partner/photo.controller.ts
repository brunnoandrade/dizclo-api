import { Controller, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

import { CreatePartnerPhotoContract } from 'src/modules/backoffice/contracts/partner/create-partner-photos.contract';
import { UpdatePartnerPhotoContract } from 'src/modules/backoffice/contracts/partner/update-partner-photos.contract';

import { PartnerPhoto } from 'src/modules/backoffice/models/partner/photo';

import { PartnerPhotoService } from 'src/modules/backoffice/services/partner/photo.service';


@Controller('v1/partners/photos')
export class PartnerPhotoController {

    constructor(
        private readonly service: PartnerPhotoService
    ) { }

    @Post(':username')
    @UseInterceptors(new ValidatorInterceptor(new CreatePartnerPhotoContract()))
    async createPet(@Param('username') username, @Body() model: PartnerPhoto) {
        try {
            await this.service.create(username, model);
            return new ResultDto(null, true, model, null)
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar imagem!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':username/:id')
    @UseInterceptors(new ValidatorInterceptor(new UpdatePartnerPhotoContract()))
    async updatePet(@Param('username') username, @Param('id') id, @Body() model: PartnerPhoto) {
        try {
            await this.service.update(username, id, model);
            return new ResultDto(null, true, model, null)
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar sua imagem!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

}
