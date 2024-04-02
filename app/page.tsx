export default async function Home({
  searchParams,
}: {
  searchParams?: { search?: string; category?: string };
}) {
  const searchTerm = searchParams?.search || "";

  return (
    <main className="mt-16 p-10 flex flex-col justify-center items-center">
      Home
    </main>
  );
}
