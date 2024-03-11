import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService) {
        
     }

    async registerUser(registerDto: RegisterUserDto) {
        const { username, password } = registerDto;
        const hashed = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);

        const user: UserEntity = new UserEntity();
        user.username = username;
        user.password = hashed;
        user.salt = salt;

        this.repo.create(user);

        try {
            return await this.repo.save(user);
        } catch (error) {
            throw new InternalServerErrorException("Something went wrong, user was not created.");
        }

    }

    async loginUser(userLoginDTO: UserLoginDto) {
        const {username, password} = userLoginDTO;
        const user: UserEntity = await this.repo.findOne({where:{username}})

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // const salt: string = user.salt;
        const isPasswordMatch: any = await bcrypt.compare(password, user.password)

        if(isPasswordMatch) {
            const jwtPayload = {username};
            const jwtToken = await this.jwt.signAsync(jwtPayload, 
                {   expiresIn: '1d',
                    algorithm: 'HS512'
                });
            return {token: jwtToken};
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }

    }


}
