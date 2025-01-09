import { jwtAuthToken } from '@/lib/jwt';
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
    const { data, error } = await supabase.from('Sarana').select('*').eq('id_sarana', id).single();

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
    const quantity = formData.get('quantity');
    const volume = formData.get('volume');
    const condition = formData.get('condition');
    const file = formData.get('itemImage');
    let publicUrl = formData.get('currentHeaderImage');

    if (file instanceof Blob && file?.name) {
      const { itemImage: relativePath } = await getRecordByColumn('Sarana', 'id_sarana', id);
      const oldDataImage = relativePath.split(`${bucket}/`)[1];

      if (oldDataImage) {
        const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
          .from(bucket)
          .remove([oldDataImage]);

        if (errorDeleteOldData) {
          throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
        }

        const date = new Date();
        const folderPath = `sarana/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
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
    if (volume) updates.volume = volume;
    if (quantity) updates.quantity = Number(quantity);
    if (condition) updates.condition = Number(condition);

    const newData = await updateRecord('Sarana', { id_sarana: id }, updates);

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

    const { itemImage: relativePath } = await getRecordByColumn('Sarana', 'id_sarana', id);
    const oldDataImage = relativePath.split(`${bucket}/`)[1];
    if (!oldDataImage) {
      return NextResponse.json({ error: 'data tidak ada' }, { status: 400 });
    }

    const { data: deleteOldData, error: errorDeleteOldData } = await supabaseAuth.storage
      .from(bucket)
      .remove([oldDataImage]);
    await deleteRecord('Sarana', { id_sarana: id });
    if (errorDeleteOldData) {
      throw new Error(`Error uploading image: ${errorDeleteOldData.message}`);
    }
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
