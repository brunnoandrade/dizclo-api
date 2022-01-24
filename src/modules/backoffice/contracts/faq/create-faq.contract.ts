import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreateFAQDto } from 'src/modules/backoffice/dtos/faq/create-faq.dto';

@Injectable()
export class CreateFAQContract implements Contract {
  errors: any[];

  validate(model: CreateFAQDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.title, 3, 'Titúlo inválido');
    flunt.hasMinLen(model.description, 3, 'Descrição inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
