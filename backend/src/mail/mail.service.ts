import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email, // Adresse de destination
        subject: 'Vérification de votre compte', // Objet
        text: `Voici votre code de vérification : ${code}`, // Version texte
        html: `<p>Voici votre code de vérification : <b>${code}</b></p>`, // Version HTML
      });
      this.logger.log(`Email de vérification envoyé à ${email}`);
    } catch (error) {
      this.logger.error("Erreur lors de l'envoi de l'email de vérification", error);
    }
  }

  async sendTwoFactorCode(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Votre code 2FA',
        text: `Votre code d'authentification à deux facteurs est : ${code}`,
        html: `<p>Votre code d'authentification à deux facteurs est : <b>${code}</b></p>`,
      });
      this.logger.log(`Email 2FA envoyé à ${email}`);
    } catch (error) {
      this.logger.error("Erreur lors de l'envoi de l'email 2FA", error);
    }
  }
}