import PagePrestasiLanding from './_components';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;
export default async function PrestasiPage() {
  try {
    const ress = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/v1.0.0/view/prestasi');
    if (!ress) {
      notFound();
    }
    const prestasi = await ress.json();

    return <PagePrestasiLanding data={prestasi} />;
  } catch (error) {
    return (
      <div>
        <h1>Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
