import { Injectable } from '@nestjs/common';

import configuration from 'src/config/configuration';
import { createTransport } from 'nodemailer';
import { CompanyDocument } from '../companies.schema';
import { MailerProvider } from './mailer.interface';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: configuration().gestoSupportEmail,
    pass: configuration().gestoSupportPassword,
  },
});

@Injectable()
export class NodeMailerService implements MailerProvider<CompanyDocument> {
  constructor() {}
  /**
   * Send email
   * @param sender company
   */
  public async sendMail(sender: CompanyDocument): Promise<any> {
    // Build the mail options and content
    const mailOptions = {
      from: configuration().gestoSupportEmail,
      to: sender.email,
      subject: 'Réduction de gaspillage mensuel',
      text:
        'Bonjour ' +
        sender.name +
        ', votre gaspillage alimentaire a réduit de ' +
        sender.monthlyWaste +
        ' ce mois-ci.',
    };
    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log('Email envoyé: ' + info.response);
    });
  }
}
