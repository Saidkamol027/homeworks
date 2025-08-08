import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private readonly userModel: typeof User) {}

	async create(createUserDto: CreateUserDto) {
		try {
			const { phone } = createUserDto
			const existsPhone = await this.userModel.findOne({ where: { phone } })

			if (existsPhone) {
				throw new ConflictException('Phone number already exist')
			}
			const newUser = await this.userModel.create({ ...createUserDto })
			return successResponse(newUser, 201)
		} catch (error) {
			handleError(error)
		}
	}

	async findAll() {
		try {
			const users = await this.userModel.findAll()
			return successResponse(users, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: number) {
		try {
			const user = await this.userModel.findByPk(id)

			if (!user) {
				throw new Error('User not found')
			}

			return successResponse(user)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		try {
			const { phone } = await updateUserDto

			const existsPhone = await this.userModel.findOne({ where: { phone } })
			if (existsPhone) {
				throw new ConflictException('Phone number already exist')
			}
			const updateUser = await this.userModel.update(updateUserDto, {
				where: { id },
			})
			const user = await this.userModel.findByPk(id)

			if (!user) {
				throw new NotFoundException('User not found')
			}

			return successResponse(user)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: number) {
		try {
			const user = await this.userModel.findByPk(id)

			if (!user) {
				throw new NotFoundException('User not found')
			}

			await this.userModel.destroy({ where: { id } })
			return successResponse({ message: 'User deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
