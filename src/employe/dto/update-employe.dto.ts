import { PartialType } from '@nestjs/mapped-types'
import { CreateEmployeeDto } from './create-employe.dto'

export class UpdateEmployeDto extends PartialType(CreateEmployeeDto) {}
