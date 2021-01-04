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

  const [iconcode, setcode] = useState(0);
  const [descrypt, setdes] = useState(" ");
  const [curtime, settime] = useState();
  useEffect(() => {
    for (const [key, value] of Object.entries(props.data)) {
      console.log(key, value);

      if (key === "data") {
        for (const obj of value) {
          settemp(obj.temp);
          setfeels(obj.app_temp);
          setatm(obj.slp);
          sethumidity(obj.rh.toFixed(2));
          setspeed(obj.wind_spd.toFixed(2));
          setdes(obj.weather.description);
          setcode(obj.weather.icon);
        }
      }
    }
  }, [props.data]);

  if (props.flag == 1) {
    return (
      <div>
        <Container
          fluid
          className="d-flex flex-column align-items-center"
          id="sup"
        >
          <Col md={6} id="main" className="d-flex justify-content-between ">
            <div>
              <h1 id="first">{temper} C</h1>
              <h3 id="second">{props.name}</h3>

              <h3 id="third">{descrypt}</h3>
            </div>
            <div>
              <div id="icon">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${iconcode}.png `}
                  alt="Weather icon"
                />
              </div>
            </div>
          </Col>
          <Col md={6} id="more">
            <Row>
              <Col>
                
                <h3>humidity: {humidity}</h3>
              </Col>
              <Col>
                <h3>pressure: {atm}mb</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>windspeed: {speed}m/s</h3>
              </Col>
              <Col>
                <h3>feels like:{feelslike}C</h3>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            id="hrp"
            className="d-flex flex-column justify-content-between"
          >
            <h2 id="idk">hourly forecast</h2>
            <Row id="hrdata">{props.myhrarr}</Row>
          </Col>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Today;
