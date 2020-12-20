import React, { useState, useEffect } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
//import { unstable_renderSubtreeIntoContainer } from "react-dom";
function Today(props) {
  const [humidity, sethumidity] = useState(0);
  const [atm, setatm] = useState(0);
  const [speed, setspeed] = useState(0);

  const [temper, settemp] = useState(0);
  const [feelslike, setfeels] = useState();
  const [sunrise, setsunrise] = useState();
  const [sunset, setsunset] = useState();
  const [iconcode, setcode] = useState(0);
  const [descrypt, setdes] = useState(" ");
  const [curtime, settime] = useState();
  useEffect(() => {
    for (const [key, value] of Object.entries(props.data)) {
      console.log(key, value);
      if (key === "main") {
        //for (const obj in value) {

        settemp(value.temp);
        setfeels(value.feels_like);
        sethumidity(value.humidity);
        setatm(value.pressure);
      }
      if (key === "sys") {
        console.log(new Date(value.sunrise * 1000).toLocaleTimeString());
        console.log(new Date(value.sunset * 1000).toLocaleTimeString("en-US"));
      }
      if (key === "wind") {
        setspeed(value.speed);
        console.log(value.speed);
      }
      if (key === "weather") {
        for (const subob of value) {
          setcode(subob.icon);
          setdes(subob.description);
        }
      }
      if (key === "dt") {
        settime(new Date().toLocaleTimeString());
      }
    }
  }, [props.data]);

  var iconurl = "httpS://openweathermap.org/img/wn/" + iconcode + "@2x.png";
  $("#wicon").attr("src", iconurl);
  if (props.flag == 1) {
    return (
      <div>
        <div className="d-flex flex-column align-items-center" id="sup">
          <Col md={6}>
            <div id="main" className="d-flex justify-content-between ">
              <div>
                <h1 id="first">{temper} C</h1>
                <h3>{props.name}</h3>

                <h3>{descrypt}</h3>
              </div>
              <div>
                <div id="icon" className="align-self-end">
                  <img id="wicon" src="" alt="Weather icon"></img>
                </div>
              </div>
            </div>
            <div id="more" className="d-flex justify-content-around ">
              <div>
                <h3>humidity: {humidity}</h3>
                <h3>windspeed: {speed}</h3>
                <h3>sunrise: {sunrise}</h3>
              </div>
              <div>
                <h3>pressure: {atm}</h3>
                <h3>feels like:{feelslike} C</h3>

                <h3>sunset: {sunset}</h3>
              </div>
            </div>
            <div id="hrp">
              <h2 id="idk">hourly forecast</h2>
              <div id="hrdata" className="d-flex justify-content-around">
                {props.myhrarr}
              </div>
            </div>
          </Col>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Today;
