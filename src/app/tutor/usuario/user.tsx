"use client";

import Image from "next/image";
import { User } from "@/lib/db";

const Profile = ({ user }: { user: User }) => {
  return (
    <section className="grow max-w-md flex justify-center items-center flex-col m-4">
      <h2 className="text-4xl font-bold mb-12">PERFIL</h2>
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image
            alt="Imagem de perfil"
            src={user.image || ""}
            fill
            className="rounded-full"
          />
        </div>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">NOME</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={user.name || ""}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">EMAIL</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={user.email || ""}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">CARGO</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          value={user.role || ""}
        />
      </div>
    </section>
  );
};

export default Profile;
