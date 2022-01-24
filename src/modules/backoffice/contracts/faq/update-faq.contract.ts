import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { UpdateFAQDto } from 'src/modules/backoffice/dtos/faq/update-faq.dto';

@Injectable()
export class UpdateFAQContract implements Contract {
  errors: any[];

  validate(model: UpdateFAQDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.title, 3, 'Titúlo inválido');
    flunt.hasMinLen(model.description, 3, 'Descrição inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
