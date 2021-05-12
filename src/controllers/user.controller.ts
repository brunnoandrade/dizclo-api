import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

// localhost:3000/users
@Controller('v1/users')
export class UserController {
    @Get()
    get() {
        return 'Obter os usuários';
    }

    @Post()
    post() {
        return 'Criar um usuário';
    }

    @Put()
    put() {
        return 'Atualizar um usuário';
    }

    @Delete()
    delete() {
        return 'Remover um usuário';
    }
}
