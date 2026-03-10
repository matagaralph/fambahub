export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Intentionally no NavBar here — auth pages should be minimal.
  return <>{children}</>;
}
