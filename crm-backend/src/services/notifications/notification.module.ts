import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
