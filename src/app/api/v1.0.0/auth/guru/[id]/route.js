import { jwtAuthToken } from '@/lib/jwt';
import { bucket, supabase, supabaseAnonKey, supabaseUrl, verifyToken } from '@/lib/prisma';
import { deleteRecord, getRecordByColumn, updateRecord } from '@/service';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const { data, error } = await supabase.from('Guru').select('*').eq('id_guru', id).single();

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
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const tokenValidation = await jwtAuthToken(req);

    if (tokenValidation.error) {
      return NextResponse.json(
        { error: tokenValidation.error },
        { status: tokenValidation.status }
      );
    }
    const { token } = tokenValidation;
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    const formData = await req.formData();

    const name = formData.get('name');
    const position = formData.get('position');
    const file = formData.get('itemImage');
    let publicUrl = formData.get('currentHeaderImage');

    if (file instanceof Blob && file?.name) {
      const { itemImage: relativePath } = await getRecordByColumn('Guru', 'id_guru', id);
      const oldDataImage = relativePath.split(`${bucket}/`)[1];

      if (oldDataImage) {
        const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
          .from(bucket)
          .remove([oldDataImage]);

        if (errorDeleteOldData) {
          throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
        }

        const date = new Date();
        const folderPath = `guru/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}`;
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
    if (name) updates.name = name;
    if (file instanceof Blob) updates.itemImage = publicUrl;
    if (position) updates.position = position;

    const newData = await updateRecord('Guru', { id_guru: id }, updates);

    return NextResponse.json({ message: 'Updated successfully', newData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const tokenValidation = await jwtAuthToken(req);

    if (tokenValidation.error) {
      return NextResponse.json(
        { error: tokenValidation.error },
        { status: tokenValidation.status }
      );
    }
    const { token } = tokenValidation;
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { itemImage: relativePath } = await getRecordByColumn('Guru', 'id_guru', id);
    const oldDataImage = relativePath.split(`${bucket}/`)[1];
    if (!oldDataImage) {
      return NextResponse.json({ error: 'data tidak ada' }, { status: 400 });
    }

    'oldDataImage delete', oldDataImage;
    const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
      .from(bucket)
      .remove([oldDataImage]);
    await deleteRecord('Guru', { id_guru: id });
    if (errorDeleteOldData) {
      throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
    }
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
