import NavBar from '@/components/navbar';
import { cookies } from 'next/headers';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const currency = cookieStore.get('fhub-currency')?.value ?? 'USD';
  return (
    <>
      <NavBar initialCurrency={currency} />
      {children}
    </>
  );
}
