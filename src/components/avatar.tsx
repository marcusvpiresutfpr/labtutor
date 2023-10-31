"use client";

import { useEffect, useState, useRef } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { User } from "next-auth";

import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function Avatar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <></>;

  if (status === "unauthenticated")
    return (
      <button
        onClick={() => toast.promise(signIn("google"), {
          loading: "Entrando...",
          success: "Entrou com sucesso!",
          error: "Erro ao entrar!"
        })}
        className="flex w-full items-center justify-center gap-x-1 rounded-full bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700 active:bg-gray-900 md:inline-flex md:w-auto"
      >
        Entrar
      </button>
    );

  if (status === "authenticated" && session?.user)
    return <Authenticated user={session.user} />;
  return <>Carregando</>;
}

const Authenticated = ({ user }: { user: User }) => {
  const [state, setState] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);

  const navigation = [
    { title: "Escrever Artigo", path: "/escritor/artigo" },
    { title: "Meus Artigos", path: "/escritor/artigos" },
    { title: "Editar Perfil", path: "/perfil" },
  ];

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      const current = profileRef.current;
      if (!current?.contains(e.target as Node)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className="relative border-t md:border-none">
      <div className="">
        <button
          ref={profileRef}
          className="hidden h-10 w-10 rounded-full outline-none ring-gray-200 ring-offset-2 md:block md:focus:ring-2"
          onClick={() => setState(!state)}
        >
          <Image
            src={user.image || "/images/avatar.png"}
            className="h-full w-full rounded-full"
            alt="Foto de perfil"
            width={40}
            height={40}
          />
        </button>
      </div>
      <ul
        className={`right-0 top-14 mt-6 space-y-6 bg-white md:absolute md:mt-0 md:w-52 md:space-y-0 md:rounded-md md:border md:shadow-md ${
          state ? "" : "md:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              className="block text-gray-600 hover:text-gray-900 md:p-3 md:hover:bg-gray-50"
              href={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
        <button
          onClick={() => toast.promise(signOut(), {
            loading: "Encerrando sessão...",
            success: "Saiu com sucesso!",
            error: "Erro ao sair!"
          })}
          className="block w-full border-t py-3 text-justify text-gray-600 hover:text-gray-900 md:p-3 md:hover:bg-gray-50"
        >
          Sair
        </button>
      </ul>
    </div>
  );
};
