import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Course } from "../course/schema/course.schema";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./schema/student.schema";

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private readonly studentModel: typeof Student,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const founded = await this.studentModel.findOne({
      where: { email: createStudentDto.email },
    });

    if (founded) {
      throw new ConflictException("This email already exists");
    }

    const newStudent = await this.studentModel.create({ ...createStudentDto });
    return newStudent;
  }

  async findAll() {
    return await this.studentModel.findAll({ include: [{ model: Course }] });
  }

  async findOne(id: number) {
    const founded = await this.studentModel.findByPk(id, {
      include: [{ model: Course }],
    });

    if (!founded) {
      throw new NotFoundException("Student not found");
    }
    return founded;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const founded = await this.studentModel.findByPk(id);

    if (!founded) {
      throw new NotFoundException("Student not found");
    }

    await founded.update({ ...updateStudentDto });

    return founded;
  }

  async remove(id: number) {
    const founded = await this.studentModel.findByPk(id);

    if (!founded) {
      throw new NotFoundException("Student not found");
    }
    await founded.destroy();
    return { message: "Student deleted successfully" };
  }
}
