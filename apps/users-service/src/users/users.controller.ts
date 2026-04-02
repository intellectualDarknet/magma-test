import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Paginated } from 'types/paginated';
import { OptionalIntPipe } from 'pipes/optionalInt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity>  {
    const user = await this.usersService.create(createUserDto);
    return UserEntity.to(user);
  }

  @Get()
  async findAll(
    @Query('skip', OptionalIntPipe) skip: number = 0,
    @Query('take', OptionalIntPipe) take: number = 10
  ) {
    const result = await this.usersService.findAll(skip, take);
    
    return {
      ...result,
      data: result.data.map(UserEntity.to),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user ? UserEntity.to(user) : null;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto)  {
    const user = await this.usersService.update(id, updateUserDto);
    return UserEntity.to(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string)  {
    const user = await this.usersService.remove(id);
    return UserEntity.to(user);
  }
}
