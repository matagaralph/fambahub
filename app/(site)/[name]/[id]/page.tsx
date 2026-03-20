import { cookies } from 'next/headers';

type Params = {
  name: string | string[];
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function GetProductsPage({ params }: Props) {
  const { name, id } = await params;
  const cookieStore = await cookies();
  const currency = cookieStore.get('fhub-currency')?.value ?? 'USD';

  const slug = Array.isArray(name) ? name.join('/') : (name ?? '');
  const destinationName = decodeURIComponent(slug).replace(/-/g, ' ').trim();

  return (
    <main className='bg-default pb-12 mx-auto max-w-7xl px-4 py-8'>
      <div className='flex gap-8'></div>
    </main>
  );
}
