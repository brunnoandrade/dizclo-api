import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { PartnerPhoto } from 'src/modules/backoffice/models/partner/photo';

@Injectable()
export class UpdatePartnerPhotoContract implements Contract {
    errors: any[];

    validate(model: PartnerPhoto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.url, 3, 'Url inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
