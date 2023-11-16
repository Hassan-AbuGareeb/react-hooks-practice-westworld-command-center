import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
function App() {
  const [hosts, setHosts] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState(0);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/hosts")
      .then((resp) => resp.json())
      .then((data) => setHosts([...data]));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
      .then((resp) => resp.json())
      .then((data) => setAreas([...data]));
  }, []);

  function handleAreaChange(hostId, newArea) {
    const updatedHosts = hosts.map((host) => {
      if (host.id === hostId) return { ...host, area: newArea };
      return host;
    });
    setHosts([...updatedHosts]);
  }

  function handleActiveChange(hostId) {
    const updatedHosts = hosts.map((host) => {
      if (host.id === hostId) return { ...host, active: !host.active };
      return host;
    });
    setHosts([...updatedHosts]);
  }

  function isAreaFull(areaName) {
    //check how many hosts in the area based on the area id
    console.log(areaName);
    let limit = 0;
    for (const host of hosts) if (host.area === areaName) ++limit;
    for (const area of areas)
      if (areaName === area.name) return limit < area.limit;
  }

  async function handleActivateAll(command) {
    const updatedHosts = hosts.map((host) => {
      return { ...host, active: command };
    });
    setHosts([...updatedHosts]);
    for (const host of hosts) {
      await fetch(`http://localhost:3001/hosts/${host.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: command }),
      });
      setTimeout(10);
    }
  }

  return (
    <Segment id="app">
      {
        <WestworldMap
          hostsList={hosts}
          selectedId={selectedHostId}
          changeSelected={setSelectedHostId}
        />
      }
      {
        <Headquarters
          hosts={hosts}
          selectedId={selectedHostId}
          changeSelected={setSelectedHostId}
          onAreaChange={handleAreaChange}
          onActiveChange={handleActiveChange}
          onChangeArea={isAreaFull}
          onActivateAll={handleActivateAll}
        />
      }
    </Segment>
  );
}

export default App;
