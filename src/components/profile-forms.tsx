import Image from "next/image";

import { useState } from "react";
import { User } from "@/lib/db/writer";

const ProfileForms = ({ user }: { user: User }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdate = () => {
    // Implemente a lógica para atualizar os dados do usuário, incluindo a imagem, se necessário.
    // Use o objeto updatedUser para obter os valores atualizados.
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      // Implemente a lógica para fazer o upload da nova imagem.
      // Atualize o estado com a nova imagem quando o upload estiver concluído.
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = parseInt(e.target.value, 10);
    setUpdatedUser({ ...updatedUser, role: selectedRole });
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-12">PERFIL</h2>
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image
            src={updatedUser.image || ""}
            alt="Imagem de perfil"
            className="rounded-full"
            fill
          />
        </div>
      </div>
      <form className="w-full max-w-xs">
        <input
          type="file"
          className="file-input file-input-bordered file-input-s w-full max-w-ns my-5"
          onChange={handleImageChange}
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">NOME</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            value={updatedUser.name || ""}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">EMAIL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            value={updatedUser.email || ""}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">CARGO</span>
          </label>
          <select
            className="select select-bordered w-full mb-4"
            value={updatedUser.role || 10}
            onChange={handleRoleChange}>
            <option value={10}>Escritor</option>
            <option value={20}>Administrador</option>
          </select>
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Atualizar
      </button>
    </>
  );
};

export default ProfileForms;
