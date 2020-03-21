import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Role } from './role.entity';

@Injectable()
export class RoleService {

	constructor(
		@InjectRepository(RoleRepository)
		private readonly roleRepository: RoleRepository,
		private readonly mapperService: MapperService,
	) { }

	async get(id: number): Promise<Role> {
		if (!id) {
			throw new BadRequestException('id must be sent');
		}

		const role: Role = await this.roleRepository.findOne(id, {
			where: { status: 'active' },
		});

		if (!role) {
			throw new NotFoundException();
		}

		return role;
	}

	async getAll(): Promise<Role[]> {
		const role: Role[] = await this.roleRepository.find({
			where: { status: 'active' },
		});

		return role;
	}

	async create(role: Role): Promise<Role> {
		const savedrole: Role = await this.roleRepository.save(role);
		return savedrole;
	}

	async update(id: number, role: Role): Promise<void> {
		await this.roleRepository.update(id, role);
	}

	async delete(id: number): Promise<void> {
		const roleExits: Role = await this.roleRepository.findOne(id, {
			where: { status: 'active' },
		});

		if (!roleExits) {
			throw new NotFoundException();
		}
		await this.roleRepository.update(id, { status: 'inactive' });
	}
}
