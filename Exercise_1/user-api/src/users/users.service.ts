import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
 async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.UserModel(createUserDto).save();
  }

 async findAll() {
    return this.UserModel.find();
  }

  findOne(id: number) {
    return this.UserModel.findOne({id: id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({id}, {$set: {...updateUserDto}})
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
