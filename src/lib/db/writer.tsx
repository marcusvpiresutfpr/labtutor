import prisma from "@/lib/prisma";

import { getServerSession } from "@/lib/auth";
import { User as UserModel } from ".prisma/client";
import { Article as ArticleModel } from ".prisma/client";

export interface User extends UserModel {}
export interface Article extends ArticleModel {
  author?: User;
}

export const getArticleById = async (
  id: string
): Promise<{ article: Article | null; user: User }> => {
  try {
    const user = await getServerSession();
    const article = await prisma.article.findUnique({
      where: { id, authorId: user?.id },
    });
    return { article, user };
  } catch (error) {
    throw new Error("Failed to retrieve article by ID.");
  }
};

export const getArticles = async (): Promise<{
  articles: Article[] | [];
  user: User;
}> => {
  try {
    const user = await getServerSession();
    const articles = await prisma.user
      .findUnique({ where: { id: user.id } })
      .articles();
    return { articles: articles || [], user };
  } catch (error) {
    throw new Error("Failed to retrieve user's articles.");
  }
};

export const getArticle = async (id: string): Promise<{ article: Article | null; user: User }> => {
  try {
    const user = await getServerSession();
    const article = await prisma.article.findUnique({
      where: { id, authorId: user?.id },
    });
    return { article, user };
  } catch (error) {
    throw new Error("Failed to retrieve user's articles.");
  }
};

export const createArticle = async (): Promise<{ article: Article | null; user: User }> => {
  try {
    const user = await getServerSession();
    const articleData = {
      title: "Novo Artigo",
      content: "Escreva um artigo bem legal aqui !",
    };
    const article = await prisma.article.create({
      data: { ...articleData, author: { connect: { id: user.id } } },
    });
    return { article, user }; 
  } catch (error) {
    throw new Error("Failed to create a new article.");
  }
};

export const updateArticle = async (
  id: string,
  artticle: Partial<Article>
): Promise<{ article: Article | null; user: User }> => {
  try {
    const user = await getServerSession();
    const articleData = {
      title: artticle.title,
      content: artticle.content,
      status: artticle.status,
    };
    const article = await prisma.article.update({
      where: { id, authorId: user?.id },
      data: articleData,
    });
    return { article, user };
  } catch (error) {
    throw new Error("Falha ao atualizar os dados do artigo.");
  }
};

export const deleteArticle = async (id: string): Promise<{ article: Article | null; user: User }> => {
  try {
    const user = await getServerSession();
    const article = await prisma.article.delete({ where: { id, authorId: user?.id } });
    return { article, user };
  } catch (error) {
    throw new Error("Failed to update article data.");
  }
};
