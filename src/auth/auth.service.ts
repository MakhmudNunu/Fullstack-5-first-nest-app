import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import bcrypt from 'bcryptjs';


 
@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(authDto: AuthDto) {
        const {name, email, password} = authDto

        const candidate = await this.usersService.findUserByEmail(email)
        if (candidate) {
            throw new BadRequestException("Пользователь с таким email уже существует!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.usersService.createUser({
            name,
            email,
            password: hashedPassword
        })

        return this.generateToken(user)
    }

    async login(authDto: AuthDto) {
        const {email, password} = authDto

        const user = await this.usersService.findUserByEmail(email)
        if (!user) {
            throw new UnauthorizedException("Неверный email или пароль!")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException("Неверный email или пароль!")
        }

        return this.generateToken(user)
    }

    private generateToken(user: any) {
        const payload = {sub: user._id, email: user.email, role: user.role}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
