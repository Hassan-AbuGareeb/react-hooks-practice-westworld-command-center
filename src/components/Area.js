import React from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";
function Area(props) {
  const { name } = props.info;
  const formattedName = name
    .split("_")
    .map((name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    })
    .join(" ");
  return (
    <div className="area" id={name}>
      <h3 className="labels">{formattedName}</h3>
      {
        <HostList
          hosts={props.hosts}
          place={"area"}
          selectedId={props.selectedId}
          changeSelected={props.changeSelected}
        />
      }
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
