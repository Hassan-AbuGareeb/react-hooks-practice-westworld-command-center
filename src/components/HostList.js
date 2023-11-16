import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";
function HostList({ place, hosts, selectedId, changeSelected }) {
  const hostItems =
    hosts !== undefined && hosts.length !== 0
      ? hosts.map((host) => {
          return (
            (place === "area" ? host.active : !host.active) && (
              <Host
                key={host.id}
                image={host.imageUrl}
                id={host.id}
                selectedId={selectedId}
                changeSelected={changeSelected}
              />
            )
          );
        })
      : null;

  return <Card.Group itemsPerRow={6}>{null || hostItems}</Card.Group>;
}

export default HostList;
