import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faChevronDown,
  faTemperatureHigh,
  faTemperatureLow,
  faTint,
  faWind,
  faArrowsAltV,
  faSun,
  faEye,
  
} from "@fortawesome/free-solid-svg-icons";

function Daily(props) {
  console.log(props.dayfetch);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 576);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 576);
    console.log("reached hre too");
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  var myweek = props.dayfetch.data.map(function weeksort(itms) {
    var date = new Date(itms.ts * 1000).toLocaleDateString();
    var dmonth = date.split("/")[1];
    var dyear = date.split("/")[2];
    var present = new Date().toLocaleDateString();
    var pmonth = present.split("/")[1];
    var pyear = present.split("/")[2];
    var descrypt = itms.weather.description;
    var mycode = itms.weather.icon;
    var avgtemp = itms.temp;
    var pope = itms.pop;
    var windspeed = itms.wind_spd.toFixed(2);
    if (date >= present || dmonth > pmonth || dyear > pyear) {
      return (
        <div key={itms.ts}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle eventKey="0">
                  {isDesktop ? (
                    <Container fluid>
                      <Row className="d-flex justify-content-around flex-nowrap">
                        <div>
                          <h4>{date}</h4>
                        </div>
                        <div>
                          <div className="d-flex align-items-center">
                            <img
                              src={`https://www.weatherbit.io/static/img/icons/${mycode}.png`}
                              alt="Weather icon"
                              id="dailyicon"
                            />
                            <h4>{descrypt}</h4>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <FontAwesomeIcon
                            icon={faCloudRain}
                            size="2x"
                          ></FontAwesomeIcon>
                          <h4 id="dayp">{pope}%</h4>
                        </div>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          size="2x"
                        ></FontAwesomeIcon>
                      </Row>
                    </Container>
                  ) : (
                    <Container fluid>
                      <Row className="d-flex justify-content-between flex-nowrap">
                        <div>
                          <p>{date}</p>
                        </div>
                        <div>
                          <img
                            src={`https://www.weatherbit.io/static/img/icons/${mycode}.png`}
                            alt="Weather icon"
                            id="dailyicon"
                          />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <FontAwesomeIcon
                            icon={faCloudRain}
                            size="2x"
                          ></FontAwesomeIcon>
                          <p id="dayp">{pope}%</p>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                          ></FontAwesomeIcon>
                        </div>
                      </Row>
                    </Container>
                  )}
                </Accordion.Toggle>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row>
                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faTint}
                          id="font"
                        ></FontAwesomeIcon>
                        dew point
                      </p>
                      <p>{itms.dewpt} C</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faWind}
                          id="font"
                        ></FontAwesomeIcon>
                        wind speed
                      </p>
                      <p>{windspeed} m/s</p>
                    </Col>

                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faTemperatureHigh}
                          id="font"
                        ></FontAwesomeIcon>
                        max temp
                      </p>
                      <p>{itms.max_temp} C</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faTemperatureLow}
                          id="font"
                        ></FontAwesomeIcon>
                        min temp
                      </p>
                      <p>{itms.min_temp} C</p>
                    </Col>

                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faTint}
                          id="font"
                        ></FontAwesomeIcon>
                        humidity(relative)
                      </p>
                      <p>{itms.rh}</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faArrowsAltV}
                          id="font"
                        ></FontAwesomeIcon>
                        pressure(mb)
                      </p>
                      <p>{itms.pres}</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faSun}
                          id="font"
                        ></FontAwesomeIcon>
                        Max UV index
                      </p>
                      <p>{itms.uv}</p>
                    </Col>
                    <Col md={6} className="d-flex justify-content-between">
                      <p>
                        <FontAwesomeIcon
                          icon={faEye}
                          id="font"
                        ></FontAwesomeIcon>
                        Visibility
                      </p>
                      <p>{itms.vis} KM</p>
                    </Col>
                    
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    } else {
      return <div key={itms.ts}></div>;
    }
  });
  return <div>{myweek}</div>;
}

export default Daily;
