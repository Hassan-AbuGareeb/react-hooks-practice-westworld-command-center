import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";
function Details({
  selectedHost,
  onAreaChange,
  onActiveChange,
  onChangeArea,
  onAction,
}) {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  return (
    <Segment id="details" className="HQComps">
      {selectedHost === 0 ? (
        <Image size="small" src={Images.westworldLogo} />
      ) : (
        <HostInfo
          hostId={selectedHost}
          onAreaChange={onAreaChange}
          onActiveChange={onActiveChange}
          onChangeArea={onChangeArea}
          onAction={onAction}
        />
      )}
    </Segment>
  );
}

export default Details;
