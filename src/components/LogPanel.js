import React, { useState } from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({ onActivateAll, logs, onAction }) {
  const [ActivateAll, setActivateAll] = useState(false);

  function handleActivateClick() {
    setActivateAll(!ActivateAll);
    onActivateAll(!ActivateAll);
    let type, message;
    if (!ActivateAll) {
      type = "warn";
      message = "Activating all hosts!";
    } else {
      type = "notify";
      message = "Decommissiong all hosts.";
    }
    onAction(type, message);
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      <Button
        fluid
        color={ActivateAll ? "green" : "red"}
        content={ActivateAll ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={handleActivateClick}
      />
    </Segment>
  );
}

export default LogPanel;
