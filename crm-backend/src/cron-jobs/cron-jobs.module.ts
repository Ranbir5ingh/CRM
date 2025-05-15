import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobsService } from './cron-jobs.service';
import { VehicleDocumentTask } from './tasks/vehicle-document.tasks';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronJobsService, VehicleDocumentTask],
})
export class CronJobsModule {}
