import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import { createRecord } from '@/service';

const prisma = new PrismaClient();

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
    }

    const { email, password, role = 'admin', name } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required.' }), {
        status: 400,
      });
    }

    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role,
        name,
      },
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
    }

    if (user.user.id) {
      const createdUser = await prisma['User'].create({
        data: {
          id_user: user.user.id,
          email,
          name,
          role,
        },
      });
      console.log(createdUser);
      return new Response(
        JSON.stringify({
          message: 'User registered successfully',
          authUser: user,
          dbUser: createdUser,
        }),
        { status: 201 }
      );
    }

    // createRecord('User', createdUser);
  } catch (error) {
    console.error('Error in register API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ users: data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
const fetchAllUsers = async () => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    throw new Error('Gagal mengambil data pengguna:', error.message);
  }
  return data.users;
};
export const DELETE = async () => {
  try {
   
    const users = await fetchAllUsers();

    if (!users || users.length === 0) {
      console.log('Tidak ada pengguna yang ditemukan.');
      return;
    }

    // Hapus setiap pengguna berdasarkan ID
    for (const user of users) {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      if (error) {
        console.error(`Gagal menghapus pengguna dengan ID: ${user.id}`, error.message);
      } else {
        console.log(`Berhasil menghapus pengguna dengan ID: ${user.id}`);
      }
    }

    console.log('Semua pengguna berhasil dihapus.');
  } catch (err) {
    console.error('Terjadi kesalahan:', err.message);
  }
};
