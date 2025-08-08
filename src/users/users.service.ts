import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>
	) {}

	async create(createUserDto: CreateUserDto) {
		try {
			const { phone } = createUserDto
			const existsPhone = await this.userModel.findOne({ phone })

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
			const users = await this.userModel.find().exec()
			return successResponse(users, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: string) {
		try {
			const user = await this.userModel.findById(id).exec()

			if (!user) {
				throw new Error('User not found')
			}

			return successResponse(user)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		try {
			const { phone } = updateUserDto

			if (phone) {
				const existsPhone = await this.userModel.findOne({
					phone,
					_id: { $ne: id },
				})
				if (existsPhone) {
					throw new ConflictException('Phone number already exist')
				}
			}

			const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
				new: true,
			})

			if (!user) {
				throw new NotFoundException('User not found')
			}

			return successResponse(user)
		} catch (error) {
			handleError(error)
		}
	}

	async uploadAvatar(id: string, avatarPath: string) {
		try {
			const user = await this.userModel.findByIdAndUpdate(
				id,
				{ avatar: avatarPath },
				{ new: true }
			)

			if (!user) {
				throw new NotFoundException('User not found')
			}

			return successResponse(user)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: string) {
		try {
			const user = await this.userModel.findByIdAndDelete(id)

			if (!user) {
				throw new NotFoundException('User not found')
			}

			return successResponse({ message: 'User deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
