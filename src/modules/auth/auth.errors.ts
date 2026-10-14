import { DomainError } from '#src/modules/shared/domain-error.js';

export class EmailAlreadyRegisteredError extends DomainError {
  constructor() {
    super('Email is already registered', 'EMAIL_ALREADY_REGISTERED');
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid email or password', 'INVALID_CREDENTIALS');
  }
}

export class InvalidTokenError extends DomainError {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
  }
}

export class ExpiredTokenError extends DomainError {
  constructor() {
    super('Token has expired', 'TOKEN_EXPIRED');
  }
}
