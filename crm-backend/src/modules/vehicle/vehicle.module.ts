import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicle.service';
import { VehiclesController } from './vehicle.controller';
import { SupabaseModule } from 'src/services/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
