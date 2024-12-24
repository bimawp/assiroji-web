import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordByColumn,
  getRecordById,
  updateRecord,
} from '@/service';
import { z } from 'zod';

// Validasi skema untuk Artikel
const artikelSchema = z
  .object({
    slug: z.string().nonempty({ message: 'Slug is required' }),
    title: z.string().nonempty({ message: 'Title is required' }),
    category: z.string().nonempty({ message: 'Category is required' }),
    tags: z.array(z.string()).nonempty({ message: 'Tags must contain at least one tag' }),
    headerImage: z.string().nonempty({ message: 'Header image is required' }),
    content: z.string().nonempty({ message: 'Content is required' }),
    authorId: z.string().nonempty({ message: 'Author ID is required' }),
  })
  .strict();

// Handle Create Artikel
export const handleCreateArtikel = async (body) => {
  const parsedBody = artikelSchema.safeParse(body);
  if (!parsedBody.success) {
    console.log(
      parsedBody.error.errors.map((e) => ({
        path: e.path,
        message: e.message,
      }))
    );
    throw new Error(parsedBody.error.errors.map((e) => `${e.path} is ${e.message}`).join(', '));
  }

  const artikel = await getRecordByColumn('Artikel', 'slug', body.slug);
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

// Handle Get Artikel by ID
export const handleGetArtikel = async (id) => {
  const artikel = await getRecordById('Artikel', { id_artikel: id });
  if (!artikel) {
    throw new Error('Artikel not found');
  }
  return artikel;
};

export const handleGetAllArtikels = async () => {
  return await getAllRecords('Artikel');
};

export const handleGetArtikelBySlug = async (slug) => {
  const artikel = await getRecordByColumn('Artikel', 'slug', slug);
  if (!artikel) {
    throw new Error('Artikel not found');
  }
  return artikel;
};

export const handleUpdateArtikel = async (slug, data) => {
  const artikel = await getRecordByColumn('Artikel', 'slug', slug);
  if (!artikel) {
    throw new Error('Artikel not found');
  }
  return await updateRecord('Artikel', { slug }, data);
};

export const handleDeleteArtikel = async (slug) => {
  const artikel = await getRecordByColumn('Artikel', 'slug', slug);
  if (!artikel) {
    throw new Error('Artikel not found');
  }
  return await deleteRecord('Artikel', { slug });
};
