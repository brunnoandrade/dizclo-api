import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { ChangePasswordDto } from 'src/modules/backoffice/dtos/account/change-password.dto';

@Injectable()
export class ChangePasswordAccountContract implements Contract {
  errors: any[];

  validate(model: ChangePasswordDto): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.password, 'Senha obrigatória.');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
