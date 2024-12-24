import { NextResponse } from 'next/server';
import { handleDeleteArtikel, handleGetArtikelBySlug, handleUpdateArtikel } from '../services.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function verifyToken(token) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return false;
  }
  return true;
}
export async function GET(req, context) {
  const { params } = context;
  const slug = params?.slug;
  if (!slug) {
    return new Response('Slug not provided', { status: 400 });
  }

  try {
    if (params.slug) {
      const artikel = await handleGetArtikelBySlug(params.slug);
      console.log('Artikel slug:', artikel);
      return NextResponse.json(artikel, { status: 200 });
    }
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const authHeader = req.headers.get('Authorization');
  console.log('authHeader', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  try {
    const formData = await req.formData();
    console.log('supabase', formData);
    const id = formData.get('id');
    const headerImage = formData.get('headerImage');
    const title = formData.get('title');
    const content = formData.get('content');
    const category = formData.get('category');
    const slug = formData.get('slug');
    const tags = formData.getAll('tags');
    const authorId = formData.get('authorId');
    const bucket = 'artikel-bucket';
    if (!params.slug) {
      throw new Error('Article ID is required for update.');
    }

    let publicUrl = formData.get('currentHeaderImage');
    const updateData = {};

    // if (authorId) updateData.authorId = authorId;

    console.log('updateData', headerImage.name);

    // console.log(publicUrl);
    if (headerImage && headerImage.name) {
      const { headerImage: relativePath } = await handleGetArtikelBySlug(params.slug);
      const oldDataImage = relativePath.split(`${bucket}/`)[1];

      console.log('OLDATA:', oldDataImage);
      if (oldDataImage) {
        const { data: deleteOldData, error: errorDeleteOldData } = await supabase.storage
          .from(bucket)
          .remove([oldDataImage]);

        if (errorDeleteOldData) {
          throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
        }
        // const { data } = supabase.storage
        //   .from(bucket)
        //   .getPublicUrl(oldDataImage);

        const date = new Date();
        const folderPath = `artikel/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}`;
        const fileName = `${Date.now()}_${headerImage.name}`;
        const filePath = `${folderPath}/${fileName}`;

        // console.log('header image', headerImage);
        // const { data, error: replaceError } = await supabase.storage
        //   .from(bucket)
        //   .update('artikel/2024-12/1735010078377_Screenshot 2024-01-31 152925.png', headerImage, {
        //     cacheControl: '3600',
        //     upsert: true,
        //   });
        // if (replaceError) {
        //   throw new Error(`Error uploading image: ${replaceError.message}`);
        // }
        // console.log('KDSKAJSLAFKLJADSKLJASDKFL', data);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, headerImage, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (publicUrlError) {
          throw new Error(`Error getting public URL: ${publicUrlError.message}`);
        }

        publicUrl = publicUrlData.publicUrl;
      }
    }
    if (publicUrl) updateData.headerImage = publicUrl;
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (slug) updateData.slug = slug;
    if (tags && tags.length > 0) updateData.tags = tags;
    const updatedArtikel = await handleUpdateArtikel(params.slug, updateData);

    return NextResponse.json(updatedArtikel, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try {
    if (!params.slug) {
      throw new Error('Article ID is required for deletion.');
    }

    await handleDeleteArtikel(params.slug);

    if ('artikel/2024-12/1735013858181_code.png') {
      const { error: deleteError } = await supabase.storage
        .from('artikel-bucket')
        .remove(['artikel/2024-12/1735013858181_code.png']);

      if (deleteError) {
        console.error(`Error deleting image: ${deleteError.message}`);
      }
    }

    return NextResponse.json({ message: 'Artikel deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function PUT(req, { params }) {
//   const authHeader = req.headers.get('Authorization');
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
//   }

//   const token = authHeader.split(' ')[1];
//   const isValidToken = await verifyToken(token);

//   if (!isValidToken) {
//     return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
//   }

//   const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//     global: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });

//   try {
//     const formData = await req.formData();
//     const headerImage = formData.get('headerImage');
//     const title = formData.get('title');
//     const content = formData.get('content');
//     const category = formData.get('category');
//     const slug = formData.get('slug');
//     const tags = formData.getAll('tags');
//     const authorId = formData.get('authorId');
//     const currentHeaderImageUrl = formData.get('currentHeaderImage');

//     if (!params.slug) {
//       throw new Error('Article slug is required for update.');
//     }

//     let publicUrl = currentHeaderImageUrl;

//     if (headerImage && headerImage.name) {
//       // Delete the old image if it exists
//       if (currentHeaderImageUrl) {
//         const bucketName = 'artikel-bucket';

//         console.log(oldImagePath);
//         if (oldImagePath) {
//           const { error: deleteError } = await supabase.storage
//             .from('artikel-bucket')
//             .remove([oldImagePath]);

//           if (deleteError) {
//             console.error(`Error deleting old image: ${deleteError.message}`);
//             // Continue with the update even if deletion fails
//           }
//         }
//       }

//       // Upload the new image
//       const date = new Date();
//       const folderPath = `artikel/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//         2,
//         '0'
//       )}`;
//       const fileName = `${Date.now()}_${headerImage.name}`;
//       const filePath = `${folderPath}/${fileName}`;

//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('artikel-bucket')
//         .upload(filePath, headerImage, {
//           cacheControl: '3600',
//           upsert: true,
//         });

//       if (uploadError) {
//         throw new Error(`Error uploading image: ${uploadError.message}`);
//       }

//       const { data: publicUrlData, error: publicUrlError } = supabase.storage
//         .from('artikel-bucket')
//         .getPublicUrl(filePath);

//       if (publicUrlError) {
//         throw new Error(`Error getting public URL: ${publicUrlError.message}`);
//       }

//       publicUrl = publicUrlData.publicUrl;
//     }

//     const updateData = {};
//     if (publicUrl) updateData.headerImage = publicUrl;
//     if (title) updateData.title = title;
//     if (content) updateData.content = content;
//     if (category) updateData.category = category;
//     if (slug) updateData.slug = slug;
//     if (tags && tags.length > 0) updateData.tags = tags;
//     if (authorId) updateData.authorId = authorId;

//     const updatedArtikel = await handleUpdateArtikel(params.slug, updateData);

//     return NextResponse.json(updatedArtikel, { status: 200 });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
