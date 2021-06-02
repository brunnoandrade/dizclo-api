import { Controller, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { ResultDto } from 'src/modules/backoffice/dtos/result.dto';

import { CreatePartnerPhotosContract } from 'src/modules/backoffice/contracts/partner/create-partner-photos.contract';

import { PartnerPhotos } from 'src/modules/backoffice/models/partner/photos.model';

import { PartnerPhotosService } from 'src/modules/backoffice/services/partner/photos.service';


@Controller('v1/partners/photos')
export class PartnerPhotosController {

    constructor(
        private readonly service: PartnerPhotosService
    ) { }

    @Post(':username')
    @UseInterceptors(new ValidatorInterceptor(new CreatePartnerPhotosContract()))
    async createPet(@Param('username') username, @Body() model: PartnerPhotos) {
        try {
            await this.service.create(username, model);
            return new ResultDto(null, true, model, null)
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar foto!', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    // @Put(':document/:id')
    // @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    // async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
    //     try {
    //         await this.service.update(document, id, model);
    //         return new ResultDto(null, true, model, null)
    //     } catch (error) {
    //         throw new HttpException(new ResultDto('Não foi possível atualizar seu pet!', false, null, error), HttpStatus.BAD_REQUEST)
    //     }
    // }

}
