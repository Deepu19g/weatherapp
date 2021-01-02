import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
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
    //console.log("useefect working");
    window.addEventListener("resize", updatedMedia);
    return () => window.removeEventListener("resize", updatedMedia);
  });
  var des;
  var temp2;
  var temphrobj = props.hdetails;

  var mylist = temphrobj.hourly.map(function (item) {
    for (const myobj2 of item.weather) {
      var iconcode = myobj2.icon;
      des = myobj2.description;
    }

    temp2 = item.temp.toString().split(".")[0];

    var dtxd = new Date(item.dt * 1000).toLocaleDateString();
    var dtxt = new Date(item.dt * 1000).toLocaleTimeString().split(":")[0];
    var dtxt2;
    if (dtxt > 12) {
      dtxt2 = Number(dtxt) - 12;
    }
    return (
      <div key={item.dt} className="d-flex justify-content-between">
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle eventKey="0">
                {isDesktop ? (
                  <Container fluid>
                    <Row>
                      {dtxt > 12 ? (
                        <Col xs={4}>
                          <p>{dtxd}</p>
                          <p>{dtxt2}pm</p>
                        </Col>
                      ) : (
                        <Col xs={4}>
                          <p>{dtxd}</p>
                          <p>{dtxt} am</p>
                        </Col>
                      )}

                      <Col xs={4}>
                        <img
                          id="wicon2"
                          src={`http://openweathermap.org/img/wn/${iconcode}@2x.png`}
                          alt="Weather icon"
                        />

                        <h3>{des}</h3>
                      </Col>

                      <Col>
                        <h3>{temp2} C</h3>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <Container fluid>
                    <Row>
                      {dtxt > 12 ? (
                        <Col xs={5}>
                          <p>{dtxd}</p>
                          <p>{dtxt2}pm</p>
                        </Col>
                      ) : (
                        <Col xs={5}>
                          <p>{dtxd}</p>
                          <p>{dtxt} am</p>
                        </Col>
                      )}

                      <Col xs={3}>
                        <img
                          id="wicon2"
                          src={`http://openweathermap.org/img/wn/${iconcode}@2x.png`}
                          alt="Weather icon"
                        />
                      </Col>

                      <Col xs={4}>
                        <h3>{temp2} C</h3>
                      </Col>
                    </Row>
                  </Container>
                )}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>
                  <Col>
                    <p>humidity</p>
                    <p>{item.humidity}</p>
                  </Col>
                  <Col>
                    <p>Feels like</p>
                    <p>{item.feels_like}</p>
                  </Col>
                  <Col>
                    <p>wind speed</p>
                    <p>{item.wind_speed}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/*<Col sm={4}>
                <h2>{dtxt}</h2>
              </Col>
              <Col sm={4}>
                <div className="d-flex align-items-center">
                  <img
                    id="wicon"
                    src={`https://www.weatherbit.io/static/img/icons/${iconcode}.png `}
                    alt="Weather icon"
                  />
                  <h2>{des}</h2>
                </div>
              </Col>
              <Col>
                <h2>{temp2} C</h2>
              </Col>
              <Col>
                <h2>{item.rh}</h2>
          </Col>*/}
      </div>
    );
  });
  console.log(mylist)
  return <div>{mylist}</div>;
}

export default Hourly;
