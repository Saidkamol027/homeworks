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
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	create(@Body() createPostDto: CreatePostDto) {
		return this.postService.create(createPostDto)
	}

	@Get()
	findAll() {
		return this.postService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(id, updatePostDto)
	}

	@Post(':id/images')
	@UseInterceptors(
		FilesInterceptor('images', 10, {
			storage: diskStorage({
				destination: './uploads/posts/images',
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
	uploadImages(
		@Param('id') id: string,
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), 
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
				],
			})
		)
		files: Express.Multer.File[]
	) {
		const imagePaths = files.map(file => file.path)
		return this.postService.uploadImages(id, imagePaths)
	}

	@Post(':id/video')
	@UseInterceptors(
		FileInterceptor('video', {
			storage: diskStorage({
				destination: './uploads/posts/videos',
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
	uploadVideo(
		@Param('id') id: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
					new FileTypeValidator({ fileType: '.(mp4|avi|mov|mkv)' }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return this.postService.uploadVideo(id, file.path)
	}

	@Post(':id/document')
	@UseInterceptors(
		FileInterceptor('document', {
			storage: diskStorage({
				destination: './uploads/posts/documents',
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
	uploadDocument(
		@Param('id') id: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50MB
					new FileTypeValidator({ fileType: '.(pdf|doc|docx|txt)' }),
				],
			})
		)
		file: Express.Multer.File
	) {
		return this.postService.uploadDocument(id, file.path)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(id)
	}
}
