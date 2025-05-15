import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { SupabaseService } from 'src/services/supabase/supabase.service';

@Injectable()
export class FileuploadService {
  private supabase: SupabaseClient;
  private bucketName: string;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
    this.bucketName = process.env.SUPABASE_BUCKET!;
  }
  async uploadFile(file: Express.Multer.File) {
    const { data, error } = await this.supabase.storage
      .from(this.bucketName)
      .upload(
        `${file.originalname}-${randomUUID()}-${Date.now()}`,
        file.buffer,
        {
          contentType: file.mimetype,
          upsert: true,
        },
      );

    if (error) {
      throw new BadRequestException(error.message);
    }

    const publicURL = this.supabase.storage
      .from(this.bucketName)
      .getPublicUrl(data.path);
    return publicURL;
  }
}
