import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "src/students/schema/student.schema";
import { Course } from "./course.schema";

@Table({ tableName: "student_course" })
export class StudentCourse extends Model {
  @ForeignKey(() => Student)
  @Column
  studentId: number;

  @ForeignKey(() => Course)
  @Column
  courseId: number;
}
