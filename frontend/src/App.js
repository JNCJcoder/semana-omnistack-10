import React, { useState, useEffect } from "react";
import api from "./services/api";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

import Logo from "./assets/github.png";

import "./global.css";
import "./app.css";
import "./Sidebar.css";
import "./main.css";

function App() {
  const [devs, setDevs] = useState([]);
  const [UserNotFound, setUserNotFound] = useState("");

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    try {
      const response = await api.post("/devs", data);

      setDevs([...devs, response.data]);
    } catch (error) {
      setUserNotFound(error.response.data);
    }
  }
  return (
    <div id="app">
      <aside>
        <span>
          <img src={Logo} alt="github" />
        </span>
        <span>{UserNotFound}</span>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
