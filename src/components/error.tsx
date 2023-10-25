"use client";

import Link from "next/link";

import { signIn } from "next-auth/react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  login?: boolean;
}

const ErrorPage = ({ title = "Acesso Restrito", message = "", login = true }: ErrorPageProps) => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold color-red">{title}</h1>
        <p className="py-6">{message}</p>
        <div className="flex justify-center">
          {login && (
            <button
              onClick={() => signIn("google")}
              className="btn btn-primary mr-4">
              ENTRAR
            </button>
          )}
          <Link href="/" className="btn btn-outline">
            VOLTAR PARA O INÍCIO
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorPage;
