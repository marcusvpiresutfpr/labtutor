import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type SafeUserUpdate = {
  name?: string;
  image?: string;
  emailVerified?: Date;
};

export const getUser = async (email: string) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    throw new Error(
      `Erro ao buscar o usuário pelo email: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
    );
  }
};

export const updateUser = async (
  id: string,
  userData: Partial<SafeUserUpdate>,
) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: {
        ...userData,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    throw new Error(
      `Erro ao atualizar o usuário: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
    );
  }
};

export const getUserArticles = async (id: string) => {
  try {
    const articles = await prisma.user.findUnique({ where: { id } }).articles();
    return articles || [];
  } catch (error) {
    throw new Error(
      `Erro ao buscar os artigos do usuário: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
    );
  }
};

export const getUserArticle = async (authorId: string, articleID: string) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleID, authorId },
    });
    return article;
  } catch (error) {
    throw new Error(
      `Erro ao buscar o artigo do usuário: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`,
    );
  }
};
