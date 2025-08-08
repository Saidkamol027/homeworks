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
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Post()
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentService.create(createCommentDto)
	}

	@Get()
	findAll() {
		return this.commentService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.commentService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
		return this.commentService.update(id, updateCommentDto)
	}

	@Post(':id/attachments')
	@UseInterceptors(
		FilesInterceptor('attachments', 5, {
			storage: diskStorage({
				destination: './uploads/comments/attachments',
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
	uploadAttachments(
		@Param('id') id: string,
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
					new FileTypeValidator({
						fileType: '.(png|jpeg|jpg|pdf|doc|docx|txt)',
					}),
				],
			})
		)
		files: Express.Multer.File[]
	) {
		const attachmentPaths = files.map(file => file.path)
		return this.commentService.uploadAttachments(id, attachmentPaths)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.commentService.remove(id)
	}
}
