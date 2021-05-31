import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreatePartnerDto } from 'src/modules/backoffice/dtos/partner/create-partner.dto';

@Injectable()
export class CreatePartnerContract implements Contract {
    errors: any[];

    validate(model: CreatePartnerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.hasMinLen(model.username, 3, 'Usuário inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
