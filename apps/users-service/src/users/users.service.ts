import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma/client';
import { Paginated } from 'types/paginated';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data
      })
    } catch(e) {
      this.logger.error(`During creation of user got error. ${e}`)
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e?.code === 'P2002') {
          throw new BadRequestException(
            'The user with this email already exists',
          )
        }
      }

      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          id
        }
      })
    } catch (e) {
      this.logger.error(`During getting user with id: ${id} got error. ${e}`)
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async findAll(skip = 0, take = 10): Promise<Paginated<User>> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const count = await tx.user.count()
        const data = await tx.user.findMany({
          skip,
          take
        })
        return {data, count}
      })
    } catch (e) {
      this.logger.error(
        `During getting the users got error. ${e}`,
      )
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User>  {
    try {
      return await this.prismaService.user.update({
        where: {
          id
        },
        data
      })
    }
    catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {

        if (e?.code === 'P2025') {
          throw new BadRequestException('The user does not exist')
        }

        if (e?.code === 'P2002') {
          throw new BadRequestException('The user with that email already exist')
        }
      }

      this.logger.error(
        `During updating the user with id: ${id} got error. ${e}`,
      )
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async remove(id: string): Promise<User>  {
    try {
      return await this.prismaService.user.delete({
        where: {
          id,
        },
      })
    } catch (e) {
      this.logger.error(
        `Error while removing user with ID "${id}": ${e}`,
      )

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e?.code === 'P2025') {
          throw new BadRequestException('The user does not exist')
        }
      }

      throw new NotFoundException(
        `Error during removing user with ID ${id}`,
      )
    }
  }
}
