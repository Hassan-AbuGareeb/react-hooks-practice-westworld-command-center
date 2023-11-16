import React, { useEffect, useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({
  hostId,
  onAreaChange,
  onActiveChange,
  onChangeArea,
  onAction,
}) {
  //info of the current host
  const [hostInfo, setHostInfo] = useState({});
  //dropdown list value
  const [value, setValue] = useState();

  const [localActive, setLocalActive] = useState();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/hosts/${hostId}`)
      .then((resp) => resp.json())
      .then((data) => {
        setHostInfo(() => {
          return { ...data };
        });
        //set the dropdown list value to the area of the current host
        setValue(data.area);
        setLocalActive(data.active);
      });
  }, [hostId]);

  //extract the data of the host
  const { firstName, imageUrl, gender } = hostInfo;

  //generate the options of the dropdown list

  useEffect(() => {
    fetch("http://localhost:3001/areas")
      .then((resp) => resp.json())
      .then((data) =>
        setOptions([
          ...data.map((area) => {
            return {
              key: area.name,
              text: area.name
                .split("_")
                .map((name) => {
                  return name.charAt(0).toUpperCase() + name.slice(1);
                })
                .join(" "),
              value: area.name,
            };
          }),
        ])
      );
  }, [hostId]);

  //handle area change of a host
  function handleOptionChange(e, { value }) {
    //check if area is not full
    if (onChangeArea(value)) {
      onAction(
        "notify",
        `${firstName} set in area ${value
          .split("_")
          .map((name) => {
            return name.charAt(0).toUpperCase() + name.slice(1);
          })
          .join(" ")}`
      );
      setValue(value);
      onAreaChange(hostId, value);
      //change the backend area of the host
      fetch(`http://localhost:3001/hosts/${hostId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...hostInfo, area: value }),
      });
    } else {
      onAction(
        "error",
        `Too many hosts. Cannot add ${firstName} to ${value
          .split("_")
          .map((name) => {
            return name.charAt(0).toUpperCase() + name.slice(1);
          })
          .join(" ")}`
      );
    }
  }

  function handleRadioChange() {
    setLocalActive((prev) => !prev);
    onActiveChange(hostId);
    fetch(`http://localhost:3001/hosts/${hostId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...hostInfo, active: !localActive }),
    });
    let type, message;
    if (!localActive) {
      type = "warn";
      message = `Activating ${firstName}`;
    } else {
      type = "notify";
      message = `Decommissioned  ${firstName}`;
    }
    onAction(type, message);
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image src={imageUrl} floated="left" size="small" className="hostImg" />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} |{" "}
              {gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={localActive ? "Active" : "Decommissioned "}
                checked={localActive}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={value}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
