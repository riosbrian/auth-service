import { DomainError } from '#src/modules/shared/domain-error.js';

export class EmailAlreadyRegisteredError extends DomainError {
  constructor() {
    super('Email is already registered', 'EMAIL_ALREADY_REGISTERED');
  }
}
