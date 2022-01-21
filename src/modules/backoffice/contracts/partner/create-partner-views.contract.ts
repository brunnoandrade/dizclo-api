import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { PartnerView } from 'src/modules/backoffice/models/partner/view';

@Injectable()
export class CreatePartnerViewContract implements Contract {
  errors: any[];

  validate(model: PartnerView): boolean {
    const flunt = new Flunt();

    flunt.isNotNull(model.rate, 'Rate inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
