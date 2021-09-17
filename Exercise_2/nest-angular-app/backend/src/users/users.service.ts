import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
 async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.UserModel(createUserDto).save();
  }

 async findAll() {
    return this.UserModel.find();
  }

 async findOne(email: string) {
    return this.UserModel.findOne({email});
  }

 async update(email: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({email}, {$set: {...updateUserDto}})
  }

 async remove(email: string) {
    return this.UserModel.deleteOne({email});
  }
}
