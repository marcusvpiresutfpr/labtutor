import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { title, content } = await request.json();
    const id = params.slug;

    if (session?.user?.email) {
      const article = await prisma.article.findUnique({
        where: { id: id },
        select: {
          content: true,
          title: true,
          author: { select: { email: true } },
        },
      });

      if (!article) {
        const result = await prisma.article.create({
          data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } },
          },
        });
        return new NextResponse(JSON.stringify({ article_id: result.id }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (article?.author?.email === session.user.email) {
        const result = await prisma.article.update({
          where: { id: id },
          data: {
            title: title,
            content: content,
          },
        });
        return new NextResponse(JSON.stringify({ article_id: result.id }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new NextResponse(JSON.stringify({ error: "Not authorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new NextResponse(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
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
