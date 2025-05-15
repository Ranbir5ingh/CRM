import { SupabaseUser } from 'src/services/supabase/subabase.dto';
import { userDto } from './user.dto';
import { Request } from 'express';

export class RequestDto extends Request {
  public user: userDto;
}

export interface RequestWithUser extends Request {
  user?: SupabaseUser;
}
