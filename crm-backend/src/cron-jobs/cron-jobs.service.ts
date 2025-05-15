import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VehicleDocumentTask } from './tasks/vehicle-document.tasks';

@Injectable()
export class CronJobsService {
  logger = new Logger(CronJobsService.name);
  constructor(private readonly vehicleDocumentTask: VehicleDocumentTask) {}
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    this.logger.verbose('startJob');
    await this.vehicleDocumentTask.checkInsurrance(
      'insurance_valid_till',
      'insurance',
    );
    await this.vehicleDocumentTask.checkInsurrance(
      'pollution_valid_date',
      'pollution',
    );
  }
}
