import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
export enum notificationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export class NotificationDto {
  @ApiProperty({
    example: 'Insurrance expiring',
    description: 'title of the notification',
  })
  @IsString()
  title: string;
  @ApiProperty({
    example: 'Insurrance expiring',
    description: 'description of the notification',
  })
  @ApiProperty({
    example: 'insurrance_expired_HR08AG6754',
    description: 'unique id of notification',
  })
  @IsString()
  notification_id: string;
  @ApiProperty({
    example: 'Insurrance expiring',
    description: 'description of the notification',
  })
  @IsString()
  description: string;
  @ApiProperty({
    example: '2023-10-10',
    description: 'expriring date of notification',
  })
  @IsString()
  expired_in: string;

  @ApiProperty({
    example: notificationStatus.ACTIVE,
    description: 'status of the notification',
  })
  @IsEnum(notificationStatus)
  status: notificationStatus.ACTIVE;
}
