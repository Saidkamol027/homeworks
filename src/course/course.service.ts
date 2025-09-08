import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Course } from './schema/course.schema'

@Injectable()
export class CourseService {
	constructor(
		@InjectModel(Course) private readonly courseModel: typeof Course
	) {}

	async create(createCourseDto: CreateCourseDto) {
		const founded = await this.courseModel.findOne({
			where: { title: createCourseDto.title },
		})

		if (founded) {
			throw new ConflictException('This course already exists')
		}

		return this.courseModel.create({ ...createCourseDto })
	}

	async findAll() {
		return this.courseModel.findAll({ include: { all: true } })
	}

	async findOne(id: number) {
		const founded = await this.courseModel.findByPk(id, {
			include: { all: true },
		})

		if (!founded) {
			throw new NotFoundException('Course not found')
		}
		return founded
	}

	async update(id: number, updateCourseDto: UpdateCourseDto) {
		const founded = await this.courseModel.findByPk(id)

		if (!founded) {
			throw new NotFoundException('Course not found')
		}

		await founded.update({ ...updateCourseDto })
		return founded
	}

	async remove(id: number) {
		const founded = await this.courseModel.findByPk(id)

		if (!founded) {
			throw new NotFoundException('Course not found')
		}

		await founded.destroy()
		return { message: 'Course deleted successfully' }
	}
}
