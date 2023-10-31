"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/avatar";

export default function Wellcome() {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Sobre", path: "/sobre" },
    { title: "Ações", path: "/acoes" },
    { title: "Eventos", path: "/eventos" },
    { title: "Artigos", path: "/artigos" },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="javascript:void(0)">
        <Image
          src="/images/logo.svg"
          width={40}
          height={40}
          alt="LabTutor Logo"
        />
      </a>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-500 hover:text-gray-800"
          onClick={() => setState(!state)}
        >
          {state ? (
            <i className="ri-close-line"></i>
          ) : (
            <i className="ri-menu-line"></i>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div
        className="absolute inset-0 h-[580px] blur-xl"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="relative">
        <header>
          <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
            <Brand />
          </div>
          <nav
            className={`pb-5 md:text-sm ${
              state
                ? "absolute inset-x-0 top-0 mx-2 mt-2 rounded-xl border bg-white shadow-lg md:relative md:mx-0 md:mt-0 md:border-none md:bg-transparent md:shadow-none"
                : ""
            }`}
          >
            <div className="mx-auto max-w-screen-xl items-center gap-x-14 px-4 md:flex md:px-8">
              <Brand />
              <div
                className={`mt-8 flex-1 items-center md:mt-0 md:flex ${
                  state ? "block" : "hidden"
                } `}
              >
                <ul className="mb-4 flex-1 items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                  {navigation.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <a href={item.path} className="block">
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <Avatar />
              </div>
            </div>
          </nav>
        </header>
        <section>
          <div className="mx-auto max-w-screen-xl gap-12 overflow-hidden px-4 py-28 text-gray-600 md:flex md:px-8">
            <div className="max-w-xl flex-none space-y-5">
              <Link
                href="artigos"
                className="inline-flex items-center gap-x-6 rounded-full border p-1 pr-6 text-sm font-medium duration-150 hover:bg-white"
              >
                <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-white">
                  Novidades
                </span>
                <p className="flex items-center">
                  Artigos mais recentes
                  <i className="ri-article-line pl-3"></i>
                </p>
              </Link>
              <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
                LabTutor
              </h1>
              <p>
                O LabTutor é um projeto dedicado a apoiar a jornada educacional
                e profissional de estudantes universitários e de ensino médio.
                Nosso objetivo é ajudar os alunos a fazer escolhas informadas em
                suas carreiras e estudos, considerando suas paixões e
                habilidades.
              </p>
              <div className="flex items-center gap-x-3 sm:text-sm">
                <Link
                  href="/escritor/artigo"
                  className="flex items-center justify-center gap-x-1 rounded-full bg-gray-800 px-4 py-2 font-medium text-white duration-150 hover:bg-gray-700 active:bg-gray-900 md:inline-flex"
                >
                  Escrever um artigo
                </Link>
                <Link
                  href="/sobre"
                  className="flex items-center justify-center gap-x-1 px-4 py-2 font-medium text-gray-700 duration-150 hover:text-gray-900 md:inline-flex"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
            <div className="hidden flex-1 md:block">
              <Image
                src="https://res.cloudinary.com/floatui/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1669333920/undraw_progressive_app_m-9-ms_oftfv5.jpg"
                className="max-w-xl"
                alt="LabTutor"
                width={600}
                height={400}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
