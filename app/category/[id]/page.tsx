export default function Page({ params }: { params: { id: string } }) {
    return <div>My Category: {params.id}</div>
  }