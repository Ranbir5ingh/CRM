import { Module } from '@nestjs/common';
import { AppService } from './api.service';
import { UsersModule } from 'src/modules/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'src/core/services/loggerService/logger.module';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { ConfigModule } from '@nestjs/config';
import { FileuploadModule } from 'src/modules/fileupload/fileupload.module';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { SupabaseModule } from 'src/services/supabase/supabase.module';
import { VehiclesModule } from 'src/modules/vehicle/vehicle.module';
import { RentalsModule } from 'src/modules/rentals/rentals.module';
import { EmailSendModule } from 'src/services/email-send/email-send.module';
import { FinanceModule } from 'src/modules/finance/finance.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';
import { CronJobsModule } from 'src/cron-jobs/cron-jobs.module';
import { NotificationModule } from 'src/services/notifications/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    CustomersModule,
    VehiclesModule,
    RentalsModule,
    FileuploadModule,
    FinanceModule,
    DashboardModule,

    // globalmodule
    SupabaseModule,
    LoggerModule,
    EmailSendModule,
    NotificationModule,

    // cronjob module
    CronJobsModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
