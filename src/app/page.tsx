import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import LoginButton from "@/components/buttons/login-button";
import LogoutButton from "@/components/buttons/logout-button";

export default async function Home() {
  const session = (await getServerSession()) || {};

  if (Object.keys(session).length !== 0) {
    redirect("/protected");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-end font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
          <div className="px-2"></div>
          {Object.keys(session).length === 0 ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>

      <div className="relative flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
