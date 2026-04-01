import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendVerificationEmail(email: string, code: string) {
    console.log(`mail de verification envoyé à ${email} avec le code : ${code}`);
  }

  async sendTwoFactorCode(email: string, code: string) {
    console.log(`mail de verification 2FA envoyé à ${email} avec le code : ${code}`);
  }
}