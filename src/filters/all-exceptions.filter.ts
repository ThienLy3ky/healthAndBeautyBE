import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { IResponse } from "src/interface";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    console.log(
      "🚀 ~ file: all-exceptions.filter.ts:14 ~ AllExceptionsFilter ~ exception:",
      exception,
    );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = null;
    let responsePayload: IResponse;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionRes = exception.getResponse() as {
        statusCode: number;
        message: string | string[];
        error: string;
        code: number;
      };

      responsePayload = {
        status: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        success: false,
        message: exceptionRes.message,
        code: exceptionRes.code || exceptionRes.statusCode,
      };
    } else {
      status = 500;
      responsePayload = {
        status: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        success: false,
        message: exception || "Internal server error",
        code: 500,
      };
      if (process.env.NODE_ENV === "development") {
        throw exception;
      }
    }
    response.status(status).json(responsePayload);
  }
}
