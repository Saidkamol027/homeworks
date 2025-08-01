import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService, IUser } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IUser[] {
    return this.appService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): IUser | undefined {
    return this.appService.getUserById(+id);
  }

  @Post()
  createUser(@Body() user: IUser) {
    return this.appService.createUser(user);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: IUser): IUser[] {
    return this.appService.updateUser(+id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.appService.deleteUser(+id);
  }
}
