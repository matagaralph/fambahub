type Params = {
  name: string | string[];
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function GetProductsPage({ params }: Props) {
  const { name, id } = await params;

  const slug = Array.isArray(name) ? name.join('/') : (name ?? '');
  const destinationName = decodeURIComponent(slug).replace(/-/g, ' ').trim();

  return (
    <div className='max-w-4xl mx-auto py-12 px-4'>
      <header className='mb-6'>
        <h1 className='text-3xl font-semibold text-slate-900'>
          {destinationName}
        </h1>
        <p className='text-sm text-muted mt-1'>ID: {id}</p>
      </header>
    </div>
  );
}
