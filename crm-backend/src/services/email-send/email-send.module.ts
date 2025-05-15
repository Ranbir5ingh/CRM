import { Global, Module } from '@nestjs/common';
import { EmailSendService } from './email-send.service';
import { EmailSendController } from './email-send.controller';

@Global()
@Module({
  controllers: [EmailSendController],
  providers: [EmailSendService],
})
export class EmailSendModule {}
