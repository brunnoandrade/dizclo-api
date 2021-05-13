import { Controller, Delete, Get, Post, Put, Param, Body } from '@nestjs/common';

// localhost:3000/v1/users
@Controller('v1/users')
export class UserController {
    @Get()
    get() {
        return 'Obter os usuários';
    }

    @Get(':document')
    getById(@Param('document') document) {
        return 'Obter os usuários' + document;
    }

    @Post()
    post(@Body() body) {
        return body;
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return {
            user: document,
            data: body
        };
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return 'Remover um usuário';
    }
}
