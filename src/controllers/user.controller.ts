import { Controller } from '@nestjs/common';

@Controller()
export class UserController {
    get() {
        return 'Obter os usuários';
    }

    post() {
        return 'Criar um usuário';
    }

    put() {
        return 'Atualizar um usuário';
    }

    delete() {
        return 'Remover um usuário';
    }
}
