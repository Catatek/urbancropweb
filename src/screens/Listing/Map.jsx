import React from "react";
import {
  GoogleMap,
  Circle,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        disableDefaultUI
        defaultZoom={11}
        defaultCenter={{ lat: props.lng, lng: props.lat }}
      >
        <Circle defaultCenter={{ lat: props.lng, lng: props.lat }} />
      </GoogleMap>
    );
  })
);

export default Map;
