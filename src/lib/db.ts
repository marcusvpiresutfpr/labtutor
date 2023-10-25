import prisma from "@/lib/prisma";

import { User as UserModel } from ".prisma/client";
import { Article as ArticleModel } from ".prisma/client";

export interface User extends UserModel {}
export interface UserData
  extends Omit<UserModel, "id" | "createdAt" | "updatedAt"> {}

export interface Article extends ArticleModel {
  author?: User;
}
export interface ArticleData extends Omit<ArticleModel, "id" | "authorId"> {}

// Function to get a user by their ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    throw new Error("Failed to retrieve user by ID.");
  }
};

// Function to get a user by their email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    throw new Error("Failed to retrieve user by email.");
  }
};

// Function to update user data
export const updateUser = async (
  id: string,
  userData: Partial<UserData>
): Promise<User | null> => {
  try {
    return await prisma.user.update({ where: { id }, data: userData });
  } catch (error) {
    throw new Error("Failed to update user data.");
  }
};

// Function to delete a user
export const deleteUser = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    throw new Error("Failed to delete user.");
  }
};

// Function to get all articles by a specific user
export const getUserArticles = async (userId: string): Promise<Article[]> => {
  try {
    return (
      (await prisma.user.findUnique({ where: { id: userId } }).articles()) || []
    );
  } catch (error) {
    throw new Error("Failed to retrieve user's articles.");
  }
};

// Function to get an article by its ID
export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    return await prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  } catch (error) {
    throw new Error("Failed to retrieve article by ID.");
  }
};

// Function to create a new article
export const createArticle = async (
  userId: string,
  articleData: ArticleData
): Promise<Article> => {
  try {
    return await prisma.article.create({
      data: { ...articleData, author: { connect: { id: userId } } },
    });
  } catch (error) {
    throw new Error("Failed to create a new article.");
  }
};

export const updateUserArticle = async (
  id: string,
  articleData: Partial<ArticleData>,
  userId: string
): Promise<Article | null> => {
  try {
    const prevArticle = await getArticleById(id);
    if (!prevArticle || prevArticle.author?.id !== userId)
      throw new Error("Artigo não encontrado.");

    const allowedFields: (keyof ArticleData)[] = ["title", "content", "status"];
    const filteredData: Partial<ArticleData> = {};

    for (const key of allowedFields) {
      if (articleData.hasOwnProperty(key)) {
        filteredData[key] = articleData[key] as string | undefined;
      }
    }
    return await prisma.article.update({ where: { id }, data: filteredData });
  } catch (error) {
    throw new Error("Falha ao atualizar os dados do artigo.");
  }
};

// Function to delete an article
export const deleteUserArticle = async (
  id: string,
  userId: string
): Promise<Article | null> => {
  try {
    const prevArticle = await getArticleById(id);
    if (!prevArticle || prevArticle.author?.id !== userId)
      throw new Error("Artigo não encontrado.");
    return await prisma.article.delete({ where: { id } });
  } catch (error) {
    throw new Error("Failed to update article data.");
  }
};
