import { Controller, Get, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus, CacheInterceptor } from '@nestjs/common';
import { Md5 } from "md5-typescript";
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

import { CreatePartnerContract } from 'src/modules/backoffice/contracts/partner/create-partner.contract';
import { UpdatePartnerContract } from 'src/modules/backoffice/contracts/partner/update-partner.contract';
import { QueryContract } from 'src/modules/backoffice/contracts/query.contract';

import { User } from 'src/modules/backoffice/models/user.model';
import { Partner } from 'src/modules/backoffice/models/partner/partner.model';
import { ResultDto } from "src/modules/backoffice/dtos/result.dto";

import { CreatePartnerDto } from 'src/modules/backoffice/dtos/partner/create-partner.dto';
import { UpdatePartnerDto } from 'src/modules/backoffice/dtos/partner/update-partner.dto';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

import { PartnerService } from 'src/modules/backoffice/services/partner/partner.service';
import { AccountService } from 'src/modules/backoffice/services/account.service';

@Controller('v1/partners')
export class PartnerController {
    constructor(
        private readonly partnerService: PartnerService,
        private readonly accountService: AccountService
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreatePartnerContract()))
    async post(@Body() model: CreatePartnerDto) {
        try {
            const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
            const user = await this.accountService.create(new User(model.username, password, true, ['partner']));
            const partner = new Partner(model.name, model.username, model.email, null, null, null, null, user);
            await this.partnerService.create(partner);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdatePartnerContract()))
    async update(@Param('document') document, @Body() model: UpdatePartnerDto) {
        try {
            await this.partnerService.update(document, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar seus dados', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async getAll() {
        const partners = await this.partnerService.findAll();
        return new ResultDto(null, true, partners, null);
    }

    @Get(':document')
    async get(@Param('document') document) {
        const partner = await this.partnerService.find(document);
        return new ResultDto(null, true, partner, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const partners = await this.partnerService.query(model);
        return new ResultDto(null, true, partners, null);
    }
}
