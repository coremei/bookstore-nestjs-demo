import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { identity } from 'rxjs';
import { getConnection } from 'typeorm';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get(':id')
    async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        const role = await this.roleService.get(id);
        return role;
    }

    @Get()
    async getRoles(): Promise<Role[]> {
        const roles = await this.roleService.getAll();
        return roles;
    }

    @Post()
    async createRole(@Body() role: Role): Promise<Role> {
        const createdRole = await this.roleService.create(role);
        return createdRole;
    }

    @Patch(':id')
    async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role): Promise<void> {
        await this.roleService.update(id, role);
    }

    @Delete(':id')
    async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.roleService.delete(id);
    }
}
