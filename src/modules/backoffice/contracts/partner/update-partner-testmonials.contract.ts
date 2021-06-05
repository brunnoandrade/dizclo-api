import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { PartnerTestmonial } from 'src/modules/backoffice/models/partner/testmonial';

@Injectable()
export class UpdatePartnerTestmonialContract implements Contract {
    errors: any[];

    validate(model: PartnerTestmonial): boolean {
        const flunt = new Flunt();

        flunt.isNotNull(model.rate, 'Rate inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
