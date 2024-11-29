import { NextResponse } from "next/server";

export class ErrorResponse {
  status: boolean;
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.status = false;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export interface SuccessResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  payload: T;
}

export function ResponseSuccess<T>(payload: T) {
  const response: SuccessResponse<T> = {
    statusCode: 200,
    status: true,
    message: "Success",
    payload,
  };
  return NextResponse.json(response, { status: 200 });
}

export function ResponseError(statusCode: number, message: string) {
  const response: ErrorResponse = {
    status: false,
    statusCode,
    message,
  };
  return NextResponse.json(response, { status: statusCode });
}

export function ResponseBadRequest(message: string) {
  return ResponseError(400, message);
}

export function ResponseUnauthorized(message: string) {
  return ResponseError(401, message);
}

export function ResponseInternalServerError(message: string) {
  return ResponseError(500, message);
}
