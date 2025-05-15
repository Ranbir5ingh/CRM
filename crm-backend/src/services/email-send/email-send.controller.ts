import { Controller, Post } from '@nestjs/common';
import { EmailSendService } from './email-send.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('email-send')
@ApiTags('send-email')
export class EmailSendController {
  constructor(private readonly emailSendService: EmailSendService) {}

  @ApiProperty({ description: 'for sending the email' })
  @Post('test')
  async sendTestEmail() {
    return await this.emailSendService.sendMail(
      'ajayshakya7860@gmail.com',
      'Test Email',
      '<h1>Hello from NestJS + Nodemailer</h1>',
    );
  }
}
