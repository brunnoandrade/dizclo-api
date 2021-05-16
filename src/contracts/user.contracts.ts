import { Flunt } from 'src/utils/flunt';
import { Contract } from './contract';
import { User } from 'src/models/user.model';

export class CreateUserContract implements Contract {
    errors: any[];

    validate(model: User): boolean {
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
