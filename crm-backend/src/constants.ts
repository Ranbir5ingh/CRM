export const HTTP_EXCEPTION_CONSTANTS = {
  // 400
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
    traceId: 'traceId',
    success: false,
  },
  // 401
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
    traceId: 'traceId',
    success: false,
  },
  // 403
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
    traceId: 'traceId',
    success: false,
  },
  // 404
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
    traceId: 'traceId',
    success: false,
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'internal server error',
    traceId: 'traceId',
    success: false,
  },
};

export const SWAGGER_CONSTANTS = {
  title: 'Car Rental API',
  description: 'Car Rental API',
  version: '1.0',
  tag: 'car-rental',
};
