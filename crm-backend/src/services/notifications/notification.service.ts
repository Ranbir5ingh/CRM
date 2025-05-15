import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { NotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  logger = new Logger(NotificationService.name);
  private supabase: SupabaseClient;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  async createNotification(NotificationData: NotificationDto[]): Promise<void> {
    const { data, error } = await this.supabase
      .from('notifications')
      .insert(NotificationData)
      .select('*');

    if (error)
      throw new BadRequestException(
        'error creating notification',
        error.message,
      );
    this.logger.log('created notification', data.length);
  }
  async getNotifications(): Promise<NotificationDto[]> {
    const { data, error } = await this.supabase
      .from('notifications')
      .select('*');
    if (error)
      throw new BadRequestException(
        'error fetching notifications',
        error.message,
      );
    return data;
  }
  async deleteNotification(notification_ids: string[]): Promise<void> {
    const { data, error } = await this.supabase
      .from('notifications')
      .delete()
      .in('notification_id', notification_ids)
      .select('*');

    if (error)
      throw new BadRequestException(
        'error deletiong notification',
        error.message,
      );

    this.logger.log('deleted notification', data.length);
  }
}
