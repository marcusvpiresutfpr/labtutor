import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { get_article } from "@/lib/article";
import { authOptions } from "@/lib/auth";

type Params = {
  slug: string;
};

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const article = await get_article(params.slug);
    if (!article) {
      return new NextResponse(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const { title, content } = await request.json();
      const result = await prisma.article.update({
        where: { id: params.slug },
        data: { title: title, content: content },
      });
      return new NextResponse(JSON.stringify({ article_id: result.id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const article = await get_article(params.slug);
    if (!article) {
      return new NextResponse(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse(JSON.stringify(article), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
