import { createArticle, getArticles } from "@/lib/db/writer";

interface Query {
  params: {
    slug: string;
  };
}

export async function POST(request: Request, query: Query) {
  const result = await createArticle();
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(request: Request, query: Query) {
  const result = await getArticles();
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}

