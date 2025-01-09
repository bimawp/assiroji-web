import { prisma } from '@/lib/prisma';

export const createRecord = async (tableName, data) => {
  return await prisma[tableName].create({
    data,
  });
};

export const getRecordById = async (tableName, columValue) => {
  return await prisma[tableName].findUnique({
    where: columValue,
  });
};

export const getAllRecords = async (tableName) => {
  return await prisma[tableName].findMany();
};

export const updateRecord = async (tableName, columValue, data) => {
  return await prisma[tableName].update({
    where: columValue,
    data,
  });
};

export const deleteRecord = async (tableName, columValue) => {
  return await prisma[tableName].delete({
    where: columValue,
  });
};
export const getRecordByColumn = async (tableName, column, value) => {
  const whereCondition = {};
  whereCondition[column] = value;

  return await prisma[tableName].findUnique({
    where: whereCondition,
  });
};
export const deleteAllRecords = async (tableName) => {
  return await prisma[tableName].deleteMany();
};
