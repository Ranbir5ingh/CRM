import { Injectable, Logger } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateVehicleDto } from 'src/modules/vehicle/vehicle.dto';
import {
  NotificationDto,
  notificationStatus,
} from 'src/services/notifications/notification.dto';
import { NotificationService } from 'src/services/notifications/notification.service';
import { SupabaseService } from 'src/services/supabase/supabase.service';

@Injectable()
export class VehicleDocumentTask {
  private supabase: SupabaseClient;
  logger = new Logger(VehicleDocumentTask.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly notificationService: NotificationService,
  ) {
    this.supabase = this.supabaseService.getClient();
  }
  getFutureDate(days: number): Date {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + days);
    return futureDate;
  }
  getDayDifferenceFromToday(dateString: string): number {
    const today = new Date();
    const inputDate = new Date(dateString);
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const inputMidnight = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate(),
    );

    const diffTime = inputMidnight.getTime() - todayMidnight.getTime();

    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  async checkInsurrance(validateDate: string, uniqueKey: string) {
    const { data, error } = await this.supabase
      .from('vehicles')
      .select('*')
      .lte(validateDate, this.getFutureDate(15).toISOString());

    if (error) {
      console.error('Error fetching vehicles:', error);
    }

    const notificationsToCreate: NotificationDto[] = [];
    const notificationIdsToDelete: string[] = [];

    data?.forEach((vehicle: any) => {
      const uniqueId = `${uniqueKey}_${vehicle.vehicle_number}`;
      notificationIdsToDelete.push(uniqueId);

      const daysLeft = this.getDayDifferenceFromToday(vehicle[validateDate]);
      const expired_in = this.getFutureDate(1).toISOString();

      const baseDto: Omit<NotificationDto, 'title' | 'description'> = {
        notification_id: uniqueId,
        expired_in,
        status: notificationStatus.ACTIVE,
      };

      const dto: NotificationDto = {
        ...baseDto,
        title: daysLeft <= 0 ? `${uniqueKey} Expired` : `${uniqueKey} Expiring`,
        description:
          daysLeft <= 0
            ? `${vehicle.vehicle_number} (${vehicle.brand} ${vehicle.model}) ${uniqueKey} expired on ${vehicle.insurance_valid_till}`
            : `${vehicle.vehicle_number} (${vehicle.brand} ${vehicle.model}) ${uniqueKey} expires in ${daysLeft} day(s)`,
      };

      notificationsToCreate.push(dto);
    });

    this.logger.log('notification deleting');
    await this.notificationService.deleteNotification(notificationIdsToDelete);
    this.logger.log('notification deleted');

    this.logger.log('notification creating');
    await this.notificationService.createNotification(notificationsToCreate);
    this.logger.log('notification created');
  }
}
