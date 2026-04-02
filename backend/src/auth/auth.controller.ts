import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { Verify2FADto } from "./dto/verify-2fa.dto";
import { LoginDto } from "./dto/login.dto";
import { register } from "module";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('verify-email')
    verifyEmail(@Body() dto: VerifyEmailDto) {
        return this.authService.verifyEmail(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('verify-2fa')
    verify2FA(@Body() dto: Verify2FADto) {
        return this.authService.verify2FA(dto);
    }

}