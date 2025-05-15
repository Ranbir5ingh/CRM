import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseUser } from './subabase.dto';

@Injectable()
export class SupabaseService {
  private supabaseAdmin: SupabaseClient;
  private supabaseClient: SupabaseClient;

  constructor(private readonly jwtService: JwtService) {
    this.supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
    );
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  getClient(): SupabaseClient {
    return this.supabaseAdmin;
  }

  getBrowserClient(): SupabaseClient {
    return this.supabaseClient;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ session: Session | null; error: any }> {
    const {
      data: { session },
      error,
    } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    return { session, error };
  }

  getUserFromToken(token: string): SupabaseUser {
    const tokenData = this.jwtService.verify(token, {
      secret: process.env.SUPABASE_JWT_SECRET,
      ignoreExpiration: false,
    });

    return {
      ...tokenData,
      id: tokenData.sub,
      name: tokenData.user_metadata.name,
      role: tokenData.user_metadata.role,
    };
  }

  async getuser(token: string) {
    if (!token) throw new BadRequestException('token not found');
    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error) {
      throw new BadRequestException(error.message);
    }

    return data.user;
  }

  async updateRole(id: string, role: string) {
    const { data, error } = await this.supabaseAdmin.auth.admin.updateUserById(
      id,
      {
        user_metadata: {
          role: role,
        },
      },
    );
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
}
