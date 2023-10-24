import Image from "next/image";

import { signOut } from "next-auth/react";
import { DefaultUser } from "next-auth";

interface AvatarProps {
  user: DefaultUser | null;
}

const Avatar = ({ user }: AvatarProps) => {
  if (user)
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Image
              className="rounded-full"
              src={user.image || "default-avatar.png"}
              alt="foto de perfil"
              fill
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">Perfil</a>
          </li>
          <li onClick={() => signOut()}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    );
  else return <></>;
};

export default Avatar;
