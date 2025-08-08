import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@Post(':id/avatar')
	@UseInterceptors(
		FileInterceptor('avatar', {
			storage: diskStorage({
				destination: './uploads/avatars',
				filename: (req, file, cb) => {
					const randomName = Array(32)
						.fill(null)
						.map(() => Math.round(Math.random() * 16).toString(16))
						.join('')
					return cb(null, `${randomName}${extname(file.originalname)}`)
				},
			}),
		})
	)
	uploadAvatar(
		@Param('id') id: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), 
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return this.usersService.uploadAvatar(id, file.path)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
