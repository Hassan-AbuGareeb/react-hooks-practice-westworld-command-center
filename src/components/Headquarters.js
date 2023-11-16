import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";
import { Log } from "../services/Log";
function Headquarters({
  hosts,
  selectedId,
  changeSelected,
  onAreaChange,
  onActiveChange,
  onChangeArea,
  onActivateAll,
}) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/logs")
      .then((resp) => resp.json())
      .then((data) => setLogs([...data]));
  }, []);

  function logAction(type, message) {
    switch (type) {
      case "notify":
        setLogs([Log.notify(message), ...logs]);
        break;
      case "warn":
        setLogs([Log.warn(message), ...logs]);
        break;
      case "error":
        setLogs([Log.error(message), ...logs]);
        break;
      default:
        console.log("nope");
    }
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        {
          <ColdStorage
            hosts={hosts}
            selectedId={selectedId}
            changeSelected={changeSelected}
          />
        }
      </Grid.Column>
      <Grid.Column width={5}>
        <Details
          selectedHost={selectedId}
          onAreaChange={onAreaChange}
          onActiveChange={onActiveChange}
          onChangeArea={onChangeArea}
          onAction={logAction}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {
          <LogPanel
            onActivateAll={onActivateAll}
            logs={logs}
            onAction={logAction}
          />
        }
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
