export default function Page({ params }: { params: { id: string } }) {
  return <div className="mt-40">My Post: {params.id}</div>;
}
