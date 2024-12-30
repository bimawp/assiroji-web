import { bucket, supabase, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { deleteRecord, getRecordByColumn, updateRecord } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(context) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('Gallery')
      .select('*')
      .eq('id_gallery', id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const authHeader = req.headers.get('Authorization');
    console.log('authHeader', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = await verifyToken(token);
    console.log('adfasd', isValidToken);
    if (!isValidToken) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const formData = await req.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const file = formData.get('itemImage');
    let publicUrl = formData.get('currentHeaderImage');

    console.log('file', file);
    if (file instanceof Blob && file?.name) {
      const { itemImage: relativePath } = await getRecordByColumn(
        'Gallery',
        'id_gallery',
        id
      );
      const oldDataImage = relativePath.split(`${bucket}/`)[1];

      if (oldDataImage) {
        const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
          .from(bucket)
          .remove([oldDataImage]);

        if (errorDeleteOldData) {
          throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
        }
        console.log('oldDataImage', oldDataImage);
        console.log('deleteOldData', deleteOldData);

        const date = new Date();
        const folderPath = `gallery/${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}`;
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = `${folderPath}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabaseAuth.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        const { data: publicUrlData, error: publicUrlError } = supabaseAuth.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (publicUrlError) {
          throw new Error(`Error getting public URL: ${publicUrlError.message}`);
        }

        publicUrl = publicUrlData.publicUrl;
      }
    }

    const updates = {};
    if (title) updates.title = title;
    if (file instanceof Blob) updates.itemImage = publicUrl;
    if (description) updates.description = description;
    console.log('uodate', updates);
    const newData = await updateRecord('Gallery', { id_gallery: id }, updates);

    console.log('data', newData);

    return NextResponse.json({ message: 'Updated successfully', newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = await verifyToken(token);

    if (!isValidToken) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { itemImage: relativePath } = await getRecordByColumn(
      'Gallery',
      'id_gallery',
      id
    );
    const oldDataImage = relativePath.split(`${bucket}/`)[1];
    if (!oldDataImage) {
      return NextResponse.json({ error: 'data tidak ada' }, { status: 400 });
    }

    console.log('oldDataImage delete', oldDataImage);
    const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
      .from(bucket)
      .remove([oldDataImage]);
    await deleteRecord('Gallery', { id_gallery: id });
    if (errorDeleteOldData) {
      throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
    }
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
