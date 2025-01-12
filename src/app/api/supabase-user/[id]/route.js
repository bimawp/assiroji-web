import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { jwtAuthToken } from '@/lib/jwt';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

export async function DELETE(req, context) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { id } = await context.params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'User ID is required.' }), { status: 400 });
    }

    const { error: supabaseError } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (supabaseError) {
      return new Response(JSON.stringify({ error: supabaseError.message }), { status: 400 });
    }

    await prisma.user.delete({
      where: { id_user: id },
    });

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req, context) {
  const { id } = await context.params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'User ID is required.' }), { status: 400 });
  }
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const { email, password, name, role } = await req.json();

    const { data: supabaseData, error: supabaseError } =
      await supabaseAdmin.auth.admin.updateUserById(id, {
        email,
        password,
      });

    if (supabaseError) {
      return new Response(JSON.stringify({ error: supabaseError.message }), { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id_user: id },
      data: {
        email,
        password,
        name,
        role,
      },
    });

    return new Response(
      JSON.stringify({ message: 'User updated successfully', user: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
