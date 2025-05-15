import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTP_EXCEPTION_CONSTANTS } from 'src/constants';
import { httpResponseDto } from '../dto/http-response.dto';
import { LoggerService } from '../services/loggerService/logger.service';
import * as tracer from 'cls-rtracer';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const endTime = Date.now();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HTTP_EXCEPTION_CONSTANTS.INTERNAL_SERVER_ERROR.status;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    const errordata = this.handleError(exception, status);
    this.loggerService.logRequest(request, response, endTime, {
      message: errordata,
    });

    response.status(status).json(errordata);
  }

  handleError(error: any, status: number) {
    const statusMessage = Object.values(HTTP_EXCEPTION_CONSTANTS).find(
      (value) => value.status === status,
    );

    const traceId = tracer.id();
    const responseData = new httpResponseDto({
      message: statusMessage
        ? statusMessage.message
        : (error?.message ??
          HTTP_EXCEPTION_CONSTANTS.INTERNAL_SERVER_ERROR.message),
      failures: {
        message:
          error?.message ??
          HTTP_EXCEPTION_CONSTANTS.INTERNAL_SERVER_ERROR.message,
        ...(error?.response?.data ?? error?.response ?? error?.data ?? {}),
      },
      status,
      traceId,
      success: false,
    });

    return responseData;
  }
}
