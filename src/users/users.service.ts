import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { handleError } from 'src/exception/handle.error'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto) {
		const existsEmail = await this.userRepo.findOne({
			where: { email: createUserDto.email },
		})

		if (existsEmail) {
			throw new ConflictException('This email already exists')
		}

		const newUser = this.userRepo.create(createUserDto)
		return await this.userRepo.save(newUser)
	}

	async findAll() {
		return await this.userRepo.find({ relations: ['orders'] })
	}

	async findOne(id: number) {
		const user = await this.userRepo.findOne({
			where: { id },
			relations: ['orders'],
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		try {
			if (updateUserDto.email) {
				const existsEmail = await this.userRepo.findOne({
					where: { email: updateUserDto.email },
				})

				if (existsEmail && existsEmail.id != id) {
					throw new ConflictException('This email already exists')
				}
			}

			await this.userRepo.update(id, updateUserDto)

			const user = await this.userRepo.findOne({ where: { id } })

			if (!user) {
				throw new NotFoundException('User not found')
			}

			return user
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: number) {
		const user = await this.userRepo.findOne({ where: { id } })

		if (!user) {
			throw new NotFoundException('User not found')
		}

		await this.userRepo.softDelete(id)
		return {}
	}
}
