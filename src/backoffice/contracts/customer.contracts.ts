import { Flunt } from 'src/utils/flunt';
import { Contract } from './contract';
import { Customer } from '../models/customer.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];

    validate(model: Customer): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isFixedLen(model.document, 11, 'CPF inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');

        // if (model.name === 'Bruno') { this.errors.push({ message: 'Bruno não são bem-vindos!' }); };

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
