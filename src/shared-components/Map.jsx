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
        defaultOptions={{
          fullscreenControl: false,
          disableDefaultUI: true,
          draggable: false,
          draggableCursor: "default",
          draggingCursor: "default",
          gestureHandling: "none"
        }}
        defaultZoom={11}
        defaultCenter={{ lat: props.lng, lng: props.lat }}
      >
        <Circle
          defaultOptions={{
            fillColor: "rgba(248, 135, 71, 1)",
            strokeColor: `rgba(248, 135, 71, 0)`,
            draggable: false
          }}
          defaultRadius={2500}
          defaultCenter={{ lat: props.lng, lng: props.lat }}
        />
      </GoogleMap>
    );
  })
);

export default Map;
