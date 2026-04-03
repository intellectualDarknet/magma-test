import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Paginated } from 'types/paginated';
import { User } from 'schemas/user.schema';
import { RmqService } from 'src/rmq/rmq.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly rmqService: RmqService
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(data);
      await this.rmqService.createUser(`user id ${user.id} was created`);

      return user;
    } catch (e: any) {
      this.logger.error(`During creation of user got error. ${e}`);

      if (e.code === 11000) {
        throw new BadRequestException(
          'The user with this email already exists',
        );
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (e) {
      this.logger.error(`During getting user with id: ${id} got error. ${e}`);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll(skip = 0, take = 10): Promise<Paginated<User>> {
    try {
      const [data, count] = await Promise.all([
        this.userModel.find().skip(skip).limit(take).exec(),
        this.userModel.countDocuments(),
      ]);

      return { data, count };
    } catch (e) {
      this.logger.error(`During getting the users got error. ${e.message}`);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();

      if (!user) {
        throw new BadRequestException('The user does not exist');
      }

      return user;
    } catch (e: any) {
      if (e.code === 11000) {
        throw new BadRequestException(
          'The user with that email already exists',
        );
      }

      this.logger.error(
        `During updating the user with id: ${id} got error. ${e}`,
      );

      throw new NotFoundException(
        `Error during removing user with ID ${id}`,
      );
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();

      if (!user) {
        throw new BadRequestException('The user does not exist');
      }

      await this.rmqService.deleteUser(`user id ${user.id} was deleted`);
      
      return user;
    } catch (e) {
      this.logger.error(
        `Error while removing user with ID "${id}": ${e}`,
      );

      throw new NotFoundException(
        `Error during removing user with ID ${id}`,
      );
    }
  }
}