import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { MailService } from "src/mail/mail.service";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) {
        throw new BadRequestException('Cet email est déjà utilisé');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const code = this.generateCode();
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        emailVerificationCode: code,
      },
    });
    await this.mailService.sendVerificationEmail(dto.email, code);
    return { message: 'Compte créé. Veuillez vérifier votre email.' };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
    }
    if (user.emailVerificationCode !== dto.code) {
        throw new BadRequestException('Code de vérification invalide');
    }

    await this.prisma.user.update({
        where: { email: dto.email }, 
        data: { isEmailVerified: true, emailVerificationCode: null}
    });

    return { message: 'Email vérifié avec succès' };
  }
}