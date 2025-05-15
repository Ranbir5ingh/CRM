import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as tracer from 'cls-rtracer';
import { Request, Response } from 'express';
import { RequestWithUser } from 'src/core/dto/http-Request.dto';
@Injectable()
export class LoggerService extends ConsoleLogger {
  formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    const id = tracer.id();
    let traceId = id ? ` [TR_ID: ${JSON.stringify(id)}]` : '';

    const pid = this.colorize(pidMessage, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
    traceId = this.colorize(traceId, 'verbose');
    message = this.stringifyMessage(message, logLevel);

    const logMessage = `${this.getTimestamp()} ${pid} ${formattedLogLevel} ${contextMessage} ${traceId}  ${String(message)} ${timestampDiff}`;

    return `${logMessage}\n`;
  }
  private getLogLevel(
    statusCode: number,
    error?: Error,
  ): 'info' | 'warn' | 'error' {
    if (statusCode >= 500 || error) return 'error';
    if (statusCode >= 400) return 'warn';
    return 'info';
  }

  logRequest(
    request: RequestWithUser,
    response: Response,
    startTime: number,
    error?: any,
  ) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const requestId = (request.headers['x-request-id'] || tracer.id()) as
      | string
      | undefined;
    if (requestId) response.setHeader('X-Request-Id', requestId);

    const logData = {
      id: requestId,
      request: {
        url: request.url,
        method: request.method,
        headers: request.headers,
        ip: request.ip,
        user: request.user || {},
        query: request.query || {},
        params: request.params || {},
      },
      response: {
        statusCode: response.statusCode,
        responseTime: responseTime,
      },
    };

    if (error) {
      this.error(JSON.stringify(logData));
    } else {
      this.log(JSON.stringify(logData));
    }
  }
}
