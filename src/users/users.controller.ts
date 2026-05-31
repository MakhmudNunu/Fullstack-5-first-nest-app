import { Body, Controller, Delete, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles(Role.ADMIN)
    async findAll() {
        return this.usersService.findAll()
    }

    @Get('me')
    async getCurrentUser(@Request() req) {
        return this.usersService.findById(req.user.userId)
    }

    @Patch('me')
    async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(req.user.userId, updateUserDto)
    }

    @Patch('me/password')
    async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.usersService.updatePassword(req.user.userId, updatePasswordDto)
    }

    @Delete('me')
    async deleteUser(@Request() req) {
        return this.usersService.deleteUser(req.user.userId)
    }
}
