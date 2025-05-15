import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseModule } from 'src/services/supabase/supabase.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SupabaseModule],
})
export class UsersModule {}
