import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];

  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.userName, 3, 'Usuário inválido');
    flunt.hasMinLen(model.fullName, 3, 'Nome completo inválido');
    flunt.hasMinLen(model.birthday, 10, 'Data de aniversário inválida');
    flunt.hasMinLen(model.gender, 1, 'Genêro inválido');
    flunt.hasMinLen(model.phoneNumber, 10, 'Número de telefone inválido');
    flunt.hasMinLen(model.document, 11, 'CPF inválido');
    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.hasMinLen(model.password, 6, 'Senha inválida');

    // if (model.name === 'Bruno') { this.errors.push({ message: 'Bruno não são bem-vindos!' }); };

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
