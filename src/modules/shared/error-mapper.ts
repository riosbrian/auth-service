import type { DomainError } from '#src/modules/shared/domain-error.js';
import { AppError } from '#src/shared/errors/app-error.js';

const AUTH_ERROR_CODES = {
  EMAIL_ALREADY_REGISTERED: 409,
} as const;

export function mapDomainErrorToAppError(err: DomainError): AppError {
  return new AppError(
    err.message,
    AUTH_ERROR_CODES[err.code as keyof typeof AUTH_ERROR_CODES] ?? 500,
  );
}
