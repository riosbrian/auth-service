import { argon2id, hash } from 'argon2';
import mongoose from 'mongoose';
import { v7 as uuidv7 } from 'uuid';
import { EmailAlreadyRegisteredError } from '#src/modules/auth/auth.errors.js';
import type { RegisterUserDTO } from '#src/modules/auth/dtos/register-user.dto.js';
import { UserModel } from '#src/modules/auth/models/mongo/user.model.js';

function isDuplicateEmailError(error: unknown): boolean {
  return (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === 11000 &&
    error.keyPattern?.email === 1
  );
}

export async function registerUser(input: RegisterUserDTO) {
  try {
    const passwordHash = await hash(input.password, { type: argon2id });

    const user = {
      id: uuidv7(),
      email: input.email,
      password: passwordHash,
    };

    await UserModel.create(user);
  } catch (error) {
    if (isDuplicateEmailError(error)) throw new EmailAlreadyRegisteredError();
    throw error;
  }
}
