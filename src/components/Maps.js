import {
  MapContainer,
  useMapEvents,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import React, { useState,useEffect } from "react";

import { Icon } from "leaflet";
import { Container,Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const skater = new Icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [25, 25],
});

function Mapsil() {
  var lat, lon;
  var temp = 0;
  const [position, setPosition] = useState(null);
  const [tempe, settempe] = useState();
  const [humidity, sethumidity] = useState();
  const [pressure, setpressure] = useState();
  const [dewpt, setdewpt] = useState();
  const [wndspd, setwndspd] = useState();
  const [uvi, setuvi] = useState();
  const [feels, setfeels] = useState();
  const [vis, setvis] = useState();
 
  
  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);
      setPosition(e.latlng);
      lat = e.latlng.lat;
      lon = e.latlng.lng;
      console.log(lat);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${e.latlng.lat}&lon=${e.latlng.lng}&exclude={minutely,alerts}&units=metric&appid=f294bbf17831f5a084f814e8ead88517`
      )
        .then((res) => res.json())
        .then((response) => {
          temp = response.current.temp;
          console.log(response.current);
          settempe(response.current.temp);
          sethumidity(response.current.humidity);
          setpressure(response.current.pressure);
          setdewpt(response.current.dew_point);
          setwndspd(response.current.wndspd);
          setuvi(response.current.uvi);
          setvis(response.current.visibility);
          setfeels(response.current.feels_like);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });
  console.log(tempe);
  return position === null ? null : (
    <Marker position={position} icon={skater}>
      <Popup className="d-flex flex-column">
        <div>Temperature:{tempe} C</div>

        <div>Humidity:{humidity} %</div>

        <div>Pressure:{pressure} hPa</div>

        <div> Dew point:{dewpt} C</div>

        <div> Wind speed:{wndspd} m/s</div>

        <div>UV index:{uvi}</div>

        <div>Visibility:{vis} metres</div>

        <div>Feels like:{feels} C</div>
      </Popup>
    </Marker>
  );
}
function Maps() {
  
 
    

  return (
    <Container fluid id="mainmap">
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Mapsil></Mapsil>
    </MapContainer>
    </Container>

  );
}
export default Maps;
