import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({ hostsList, selectedId, changeSelected }) {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    if (hostsList !== undefined)
      fetch("http://localhost:3001/areas")
        .then((resp) => resp.json())
        .then((data) => setAreas([...data]));
  }, [hostsList]);

  const areaItems = areas.map((area) => {
    return (
      <Area
        key={area.id}
        info={area}
        selectedId={selectedId}
        changeSelected={changeSelected}
        hosts={hostsList.filter((host) => {
          return host.area === area.name;
        })}
      />
    );
  });
  return <Segment id="map">{areaItems}</Segment>;
}

export default WestworldMap;
