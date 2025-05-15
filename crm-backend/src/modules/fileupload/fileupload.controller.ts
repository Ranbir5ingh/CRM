import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeeGuard } from 'src/services/supabase/supabase.guards';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('File Upload')
@ApiBearerAuth()
@Controller('upload-document')
export class FileuploadController {
  constructor(private readonly fileuploadService: FileuploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(EmployeeGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.fileuploadService.uploadFile(file);
    return data;
  }
}
