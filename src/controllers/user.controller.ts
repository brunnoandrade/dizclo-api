import { Controller, Delete, Get, Post, Put, Param, Body } from '@nestjs/common';
import { Result } from 'src/models/result.model';
import { User } from 'src/models/user.model';

// localhost:3000/v1/users
@Controller('v1/users')
export class UserController {
    @Get()
    get() {
        return new Result(null, true, [], null)
    }

    @Get(':document')
    getById(@Param('document') document: string) {
        return new Result(null, true, {}, null)
    }

    @Post()
    post(@Body() body: User) {
        return new Result('Cliente criado com sucesso!', true, body, null)
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result('Cliente alterado com sucesso!', true, body, null)
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente removido com sucesso!', true, null, null)
    }
}
