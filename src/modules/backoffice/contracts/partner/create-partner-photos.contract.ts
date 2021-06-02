import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { PartnerPhotos } from 'src/modules/backoffice/models/partner/photos.model';

@Injectable()
export class CreatePartnerPhotosContract implements Contract {
    errors: any[];

    validate(model: PartnerPhotos): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.url, 3, 'Url inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
