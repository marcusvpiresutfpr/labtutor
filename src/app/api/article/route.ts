import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { title, content } = await request.json();

    if (session?.user?.email) {
      const result = await prisma.article.create({
        data: {
          title: title,
          content: content,
          author: { connect: { email: session?.user?.email } },
        },
      });
      return new NextResponse(JSON.stringify({ id: result.id }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify({ error: "Not authorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
