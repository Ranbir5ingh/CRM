import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseController } from './supabase.controller';
import { JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SUPABASE_JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SupabaseController],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
