import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSendService {
  private transporter: nodemailer.transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
