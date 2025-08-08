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
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoryService.create(createCategoryDto)
	}

	@Get()
	findAll() {
		return this.categoryService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		return this.categoryService.update(id, updateCategoryDto)
	}

	@Post(':id/icon')
	@UseInterceptors(
		FileInterceptor('icon', {
			storage: diskStorage({
				destination: './uploads/categories/icons',
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
	uploadIcon(
		@Param('id') id: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg|svg)' }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return this.categoryService.uploadIcon(id, file.path)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(id)
	}
}
