import React from "react";

export default function DevItem({ dev, editar, deletar }) {
  function editDev() {
    // WIP
  }
  function deleteDev() {
    deletar(dev.github_username);
  }

  return (
    <li key={dev._id} className="dev-item">
      <header>
        <img
          src={dev.avatar_url}
          alt={dev.name === null ? dev.github_username : dev.name}
        />
        <div className="user-info">
          <strong>{dev.name === null ? dev.github_username : dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
        <div className="menus">
          <button type="button" onclick={editDev}>
            Editar Dev
          </button>
          <button type="button" onclick={deleteDev}>
            Deletar Dev
          </button>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}
