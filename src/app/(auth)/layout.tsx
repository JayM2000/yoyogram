export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-dark-base dark:bg-dark-base light:bg-light-base">
      {children}
    </div>
  );
}
