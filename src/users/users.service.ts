import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(userData: Partial<User>): Promise<UserDocument> {
        return this.userModel.create(userData);
    }

    async findAll() {
        return this.userModel.find().exec();
    }

    async findUserByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec()
    }

    async findById(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }

        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        const user = await this.findById(id)

        if (updateUserDto.email) {
            const existingUser = await this.findUserByEmail(updateUserDto.email)
            if (existingUser && existingUser._id.toString() !== id) {
                throw new BadRequestException('Пользовательс таким email уже существует!')
            }
        }

        Object.assign(user, updateUserDto);
        return user.save()
    }

    async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
        const user = await this.findById(id)

        const isPasswordValid = await bcrypt.compare(updatePasswordDto.oldPassword, user.password)

        if (!isPasswordValid) {
            throw new BadRequestException('Старый пароль не подходит')
        }

        const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10)
        user.password = hashedPassword
        await user.save()
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new NotFoundException('Пользователь не найден')
        }
    }

}
