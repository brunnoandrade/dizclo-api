import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { UpdatePartnerDto } from 'src/modules/backoffice/dtos/partner/update-partner.dto';

@Injectable()
export class UpdatePartnerContract implements Contract {
  errors: any[];

  validate(model: UpdatePartnerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.fullName, 3, 'Nome completo inválido');
    flunt.hasMinLen(model.birthday, 10, 'Data de aniversário inválida');
    flunt.hasMinLen(model.gender, 1, 'Genêro inválido');
    flunt.hasMinLen(model.phoneNumber, 10, 'Número de telefone inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
