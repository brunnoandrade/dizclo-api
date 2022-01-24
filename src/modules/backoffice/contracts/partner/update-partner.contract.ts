import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { UpdatePartnerDto } from 'src/modules/backoffice/dtos/partner/update-partner.dto';

@Injectable()
export class UpdatePartnerContract implements Contract {
  errors: any[];

  validate(model: UpdatePartnerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.hasMinLen(model.userName, 3, 'Usuário inválido');
    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.hasMinLen(model.avatar, 1, 'Avatar inválido');
    flunt.hasMinLen(model.latitude, 3, 'Latitude inválida');
    flunt.hasMinLen(model.longitude, 3, 'Longitude inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
