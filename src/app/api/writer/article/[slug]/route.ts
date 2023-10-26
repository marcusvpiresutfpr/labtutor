import { deleteArticle, getArticle, updateArticle } from "@/lib/db/writer";

interface Query {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, query: Query) {
  const result = await getArticle(query.params.slug);
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: Request, query: Query) {
  const result = await updateArticle(query.params.slug, await request.json());
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request: Request, query: Query) {
  const result = await deleteArticle(query.params.slug);
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(request: Request, query: Query) {
  const result = await updateArticle(query.params.slug, await request.json());
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}
