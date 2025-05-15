import { ApiProperty } from '@nestjs/swagger';

export class httpResponseDto {
  @ApiProperty({ description: 'error message' })
  message?: string;

  @ApiProperty({ description: 'error message' })
  failures?: string;

  @ApiProperty({ description: 'error code' })
  status?: number;

  @ApiProperty({ description: 'Trace Id' })
  traceId?: unknown;

  @ApiProperty({ description: 'Success' })
  success?: boolean;

  constructor(partial?: Partial<httpResponseDto>) {
    Object.assign(this, partial);
  }
}
