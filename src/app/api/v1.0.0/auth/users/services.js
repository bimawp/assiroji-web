import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordByColumn,
  getRecordById,
  updateRecord,
} from '@/service';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const userSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  })
  .strict();

export const handleCreateUser = async (body) => {
  const parsedBody = userSchema.safeParse(body);
  if (!parsedBody.success) {

    throw new Error(parsedBody.error.errors.map((e) => `${e.path} is ${e.message}`).join(', '));
  }
  const user = await getRecordByColumn('User', 'email', body.email);
  if (user) {
    throw new Error('Email sudah ada');
  }
  const hashPassword = await bcrypt.hash(body.password, 10);
  const newUser = {
    ...body,
    password: hashPassword,
    role: 'peserta',
  };
  return await createRecord('User', newUser);
};

export const handleGetUser = async (id) => {
  const user = await getRecordById('User', { id_user: id });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const handleGetAllUsers = async () => {
  return await getAllRecords('User');
};

export const handleUpdateUser = async (id, body) => {
  return await updateRecord('User', { id_user: id }, body);
};

export const handleDeleteUser = async (id) => {
  return await deleteRecord('User', { id_user: id });
};
