import { getServerSession } from "@/lib/auth";
import { deleteUserArticle, updateUserArticle } from "@/lib/db";
import { NextResponse } from "next/server";

type Params = { slug: string };

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const article = await request.json();
    const user = await getServerSession();
    if (!user?.id || !article) return new NextResponse(null, { status: 401 });
    const result = await updateUserArticle(params.slug, article, user.id);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const user = await getServerSession();
    if (!user?.id) return new NextResponse(null, { status: 401 });
    
    const article = await deleteUserArticle(params.slug, user.id)
    return new NextResponse(JSON.stringify({ message: "Article deleted successfully" }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
