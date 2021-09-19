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

  ObjectId = require('mongodb').ObjectId

 async findAll() {
    return this.UserModel.find();
  }

 async findOne(id: string) {

    return this.UserModel.findOne({_id: this.ObjectId(id)});
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({_id: this.ObjectId(id)}, {$set: {...updateUserDto}})
  }

 async remove(id: string) {
    return this.UserModel.deleteOne({_id: this.ObjectId(id)});
  }
}
