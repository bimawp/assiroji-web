import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordByColumn,
  getRecordById,
  updateRecord,
} from '@/service';
import { z } from 'zod';

const artikelSchema = z
  .object({
    slug: z.string(),
    title: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    headerImage: z.string(),
    content: z.string(),
    authorId: z.string(),
  })
  .strict();

export const handleCreateEkstrakulikulerItem = async (body) => {
  const parsedBody = artikelSchema.safeParse(body);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.errors.map((e) => `${e.path} is ${e.message}`).join(', '));
  }

  const artikel = await getRecordByColumn('Ekstrakulikuler', 'slug', body.slug);
  if (artikel) {
    throw new Error('Slug sudah ada');
  }

  const newArtikel = {
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return await createRecord('Artikel', newArtikel);
};
