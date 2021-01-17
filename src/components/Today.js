import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWind,
  faArrowsAltV,
  faTemperatureLow,
  faSun,
  faEye,
  faLungs,
} from "@fortawesome/free-solid-svg-icons";
function Today(props) {
  const [humidity, sethumidity] = useState(0);
  const [atm, setatm] = useState(0);
  const [speed, setspeed] = useState(0);
  //const [myhrarr, setmyhrarr] = useState([]);
  const [temper, settemp] = useState(0);
  const [feelslike, setfeels] = useState();

  const [iconcode, setcode] = useState(0);
  const [descrypt, setdes] = useState(" ");
 // const [curtime, settime] = useState();
  const [aqi, setaqi] = useState();
  const [dewpt, setdewpt] = useState();
  const [vis, setvis] = useState();
  const [uv, setuv] = useState();
  
  useEffect(() => {
    for (const [key, value] of Object.entries(props.data)) {
      

      if (key === "data") {
        for (const obj of value) {
          settemp(obj.temp);
          setfeels(obj.app_temp);
          setatm(obj.slp);
          sethumidity(obj.rh.toFixed(2));
          setspeed(obj.wind_spd.toFixed(2));
          setdes(obj.weather.description);
          setcode(obj.weather.icon);
          setaqi(obj.aqi);
          setdewpt(obj.dewpt);
          setvis(obj.vis);
          setuv(obj.uv.toFixed(2));
        }
      }
    }
  }, [props.data]);
  
  var mytemhrarr=[];
  if (Object.keys(props.hdetails).length > 2) {
    
    var i=0;
    var time = new Date().toLocaleTimeString().split(":")[0];

    var curdate = new Date().toLocaleDateString();
     mytemhrarr = props.hdetails.hourly.map(function hrdetail(itd) {
      
      var dtxtime = new Date(itd.dt * 1000).toLocaleTimeString().split(":")[0];
      var dtxpm = 0;
      var dtxdate = new Date(itd.dt * 1000).toLocaleDateString();

      if (
        ((dtxtime >= time && dtxdate === curdate) || dtxdate > curdate) &&
        (i < 4)
      ) {
        
        i++;
        for (const myobj of itd.weather) {
          var icod = myobj.icon;
        }
        
        if (dtxtime > 12) {
          dtxpm = Number(dtxtime) - 12;
        }
        
        if (dtxpm === 0) {
          
         

          return (
            <Col xs={3} key={itd.dt}>
              <img
                id="wicon"
                src={`http://openweathermap.org/img/wn/${icod}@2x.png`}
                alt="Weather icon"
              />

              <p>{itd.temp}C</p>

              <h4>{dtxtime}am</h4>
            </Col>
          );
        } else {
          
          return (
            <Col xs={3} key={itd.dt}>
              <img
                id="wicon"
                src={`http://openweathermap.org/img/wn/${icod}@2x.png`}
                alt="Weather icon"
              />

              <p>{itd.temp}C</p>

              <h4>{dtxpm}pm</h4>
            </Col>
          );
        }
        
        
        
      }
    });
    
  }
  if (Object.keys(props.data).length !== 0) {
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
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faTint} id="font"></FontAwesomeIcon>
                    humidity:
                  </p>
                </div>
                <div>
                  <p>{humidity}</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon
                      icon={faArrowsAltV}
                      id="font"
                    ></FontAwesomeIcon>
                    pressure:{" "}
                  </p>
                </div>
                <div>
                  <p>{atm} mb</p>
                </div>
              </Col>

              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faWind} id="font"></FontAwesomeIcon>
                    windspeed:
                  </p>
                </div>
                <div>
                  <p> {speed} m/s</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureLow}
                      id="font"
                    ></FontAwesomeIcon>
                    feels like:
                  </p>
                </div>
                <div>
                  <p>{feelslike} C</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faLungs} id="font"></FontAwesomeIcon>
                    aqi:
                  </p>
                </div>
                <div>
                  <p>{aqi}[EPA]</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faTint} id="font"></FontAwesomeIcon>
                    dew point:
                  </p>
                </div>
                <div>
                  <p>{dewpt} C</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faEye} id="font"></FontAwesomeIcon>
                    visibility:
                  </p>
                </div>
                <div>
                  <p>{vis} km</p>
                </div>
              </Col>
              <Col md={6} className="d-flex justify-content-between">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faSun} id="font"></FontAwesomeIcon>{" "}
                    UV index:
                  </p>
                </div>
                <div>
                  <p>{uv}</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            id="hrp"
            className="d-flex flex-column justify-content-between"
          >
            <h2 id="idk">hourly forecast</h2>
            <Row id="hrdata">{mytemhrarr}</Row>
          </Col>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Today;
