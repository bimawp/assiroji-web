import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    if (!params.id) {
      return new Response(JSON.stringify({ error: 'User ID is required.' }), { status: 400 });
    }

    // Hapus pengguna dari Supabase
    const { error: supabaseError } = await supabaseAdmin.auth.admin.deleteUser(params.id);
    if (supabaseError) {
      return new Response(JSON.stringify({ error: supabaseError.message }), { status: 400 });
    }

    // Hapus pengguna dari database Prisma
    await prisma.user.delete({
      where: { id_user: params.id },
    });

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { email, password, name, role } = await req.json(); // Ambil data dari body request

    if (!id_user) {
      return new Response(JSON.stringify({ error: 'User ID is required.' }), { status: 400 });
    }

    // Update di Supabase
    const { data: supabaseData, error: supabaseError } =
      await supabaseAdmin.auth.admin.updateUserById(params.id, {
        email,
        password,
      });

    if (supabaseError) {
      return new Response(JSON.stringify({ error: supabaseError.message }), { status: 400 });
    }

    // Update di Prisma
    const updatedUser = await prisma.user.update({
      where: { id_user: params.id },
      data: {
        email,
        password,
        name, // Memperbarui nama pengguna
        role, // Memperbarui role pengguna
      },
    });

    return new Response(
      JSON.stringify({ message: 'User updated successfully', user: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
