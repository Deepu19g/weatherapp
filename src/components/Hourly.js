import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faChevronDown,
  faTint,
  faWind,
  faArrowsAltV,
  faTemperatureLow,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";


function Hourly(props) {
  const [isDesktop, setdDesktop] = useState(window.innerWidth > 576);
  
  
  const updatedMedia = () => {
    if (window.innerWidth > 576) {
      setdDesktop(true);
    } else {
      setdDesktop(false);
    }
  };
  useEffect(() => {
    
    window.addEventListener("resize", updatedMedia);
    return () => window.removeEventListener("resize", updatedMedia);
  });
  
  var des;
  var temp2;
  var temphrobj = props.hdetails;
  var presenttime = new Date().toLocaleTimeString().split(":")[0];
  var presentdate = new Date().toLocaleDateString();
  var presentm = presentdate.split("/")[1];
  var presenty = presentdate.split("/")[2];
  if (Object.keys(temphrobj).length > 2 &&props.searched===true) {
    var mylist = temphrobj.hourly.map(function (item) {
      for (const myobj2 of item.weather) {
        var iconcode = myobj2.icon;
        des = myobj2.description;
      }

      temp2 = item.temp.toString().split(".")[0];

      var dtxd = new Date(item.dt * 1000).toLocaleDateString();
      var dtxt = new Date(item.dt * 1000).toLocaleTimeString().split(":")[0];
      var dtxm = dtxd.split("/")[1];
      var dtxy = dtxd.split("/")[2];
      var dtxt2;
      if (dtxt > 12) {
        dtxt2 = Number(dtxt) - 12;
      }
      if (
        (dtxt >= presenttime && dtxd === presentdate) ||
        dtxd > presentdate ||
        dtxm > presentm ||
        dtxy > presenty
      ) {
        return (
          <div key={item.dt} className="d-flex justify-content-center">
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle eventKey="0">
                    {isDesktop ? (
                      <Container fluid>
                        <Row className="d-flex align-items-center">
                          {dtxt > 12 ? (
                            <Col xs={4}>
                              <h3>
                                {dtxd}
                                <br></br>
                                {dtxt2}pm
                              </h3>
                            </Col>
                          ) : (
                            <Col xs={4}>
                              <h3>
                                {dtxd}
                                <br></br>
                                {dtxt} am
                              </h3>
                            </Col>
                          )}

                          <Col xs={4} className="d-flex align-items-center">
                            <div>
                              <img
                                id="wicon2"
                                src={`http://openweathermap.org/img/wn/${iconcode}@2x.png`}
                                alt="Weather icon"
                              />
                            </div>
                            <div>
                              <h3>{des}</h3>
                            </div>
                          </Col>

                          <Col>
                            <h3>{temp2} C</h3>
                          </Col>
                          <Col>
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              size="2x"
                            ></FontAwesomeIcon>
                          </Col>
                        </Row>
                      </Container>
                    ) : (
                      <Container fluid>
                        <Row className="d-flex justify-content-between align-items-center flex-nowrap">
                          {dtxt > 12 ? (
                            <div>
                              <p>
                                {dtxd}
                                <br></br>
                                {dtxt2}pm
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p>
                                {dtxd}
                                <br></br>
                                {dtxt} am
                              </p>
                            </div>
                          )}

                          <div>
                            <img
                              id="wicon2"
                              src={`http://openweathermap.org/img/wn/${iconcode}@2x.png`}
                              alt="Weather icon"
                            />
                          </div>

                          <div>
                            <p>{temp2} C</p>
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
                          humidity
                        </p>
                        <p>{item.humidity}%</p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-between">
                        <p>
                          <FontAwesomeIcon
                            icon={faTemperatureLow}
                            id="font"
                          ></FontAwesomeIcon>
                          Feels like
                        </p>
                        <p>{item.feels_like} C</p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-between">
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            icon={faWind}
                            id="font"
                          ></FontAwesomeIcon>
                          wind speed
                        </p>
                        <p>{item.wind_speed} m/s</p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-between">
                        <p>
                          <FontAwesomeIcon
                            icon={faTint}
                            id="font"
                          ></FontAwesomeIcon>
                          dew point
                        </p>
                        <p>{item.dew_point} C</p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-between">
                        <p>
                          <FontAwesomeIcon
                            icon={faArrowsAltV}
                            id="font"
                          ></FontAwesomeIcon>
                          pressure
                        </p>
                        <p>{item.pressure} hPa</p>
                      </Col>
                      <Col md={6} className="d-flex justify-content-between">
                        <p>
                          <FontAwesomeIcon
                            icon={faSun}
                            id="font"
                          ></FontAwesomeIcon>
                          UV index
                        </p>
                        <p>{item.uvi}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        );
      }
      else{
        <div key={item.dt}></div>
      }
    });
    return <div>{mylist}</div>;
  } 
  else{
    return <Redirect to="/"></Redirect>
  }
}

export default Hourly;
