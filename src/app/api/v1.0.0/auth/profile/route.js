import { jwtAuthToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const profiles = await prisma.profile.findFirst({
      include: { siswaTahunan: true },
    });
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function POST(req) {
  const tokenValidation = await jwtAuthToken(request);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const data = await req.json();

    const { siswaTahunan, ...profileData } = data;

    const newProfile = await prisma.profile.create({
      data: {
        ...profileData,
        siswaTahunan: {
          create: siswaTahunan,
        },
      },
      include: {
        siswaTahunan: true,
      },
    });

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req) {
  const tokenValidation = await jwtAuthToken(req);

  if (tokenValidation.error) {
    return NextResponse.json({ error: tokenValidation.error }, { status: tokenValidation.status });
  }
  try {
    const data = await req.json();

    const { id_profile, siswaTahunan, ...profileData } = data;

    if (!id_profile) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const updateData = {
      ...profileData,
    };

    if (siswaTahunan && siswaTahunan.length > 0) {
      const updatePromises = siswaTahunan.map((item) => {
        const data = {
          id_siswaTahunan: item.id_siswaTahunan,
          id_profile,
          ...(item.tahun !== undefined && { tahun: Number(item.tahun) }),
          ...(item.jumlahSiswa !== undefined && { jumlahSiswa: Number(item.jumlahSiswa) }),
        };

        return prisma.siswaTahunan.update({
          where: { id_siswaTahunan: item.id_siswaTahunan },
          data: data,
        });
      });

      await Promise.all(updatePromises);
    }

    const updatedProfile = await prisma.profile.update({
      where: { id_profile },
      data: updateData,
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
