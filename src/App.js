import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./components/sylesheets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import Today from "./components/Today";
function App() {
  const [name, setname] = useState(" ");
  //const [IsLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [flag, setflag] = useState(0);
  const [hdetails, sethdetail] = useState({});
  const [flag2, setflag2] = useState(0);
  const [late, setlat] = useState();
  const [long, setlong] = useState();
  const [Mylist, setmylist] = useState([]);
  var iconcode;
  const api = {
    base2: "https://community-open-weather-map.p.rapidapi.com/forecast?",
    base: "https://community-open-weather-map.p.rapidapi.com/weather?",
    //id: "e5005f9710msh08af91097dd5460p1acaaajsn2fe300cfa360",
  };
  const [myhrarr, setmyhrarr] = useState([]);
  function onSearch(e) {
    setflag(1);
    e.preventDefault();
    console.log("reached onserach");
    fetch(`https://api.weatherbit.io/v2.0/current?city=${name}&key=438b481d5a99435daccd13ab74b8117b`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setlat(response.data.lat);
        setlong(response.data.lon);
        setItems(response);
      })

      .catch((err) => {
        console.error(err);
      });
  }
  
  useEffect(() => {
    console.log(late);
    var time = new Date().toString().split(" ")[4];
    console.log(time);
    var curdate = new Date().toLocaleDateString();
    console.log(curdate);
    fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${name}&key=438b481d5a99435daccd13ab74b8117b&hours=48`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        sethdetail(response);
        var i = 0;
        var dtxpm = 0;
        var mytemhrarr = response.data.map(function hrdetail(itd) {
          //var dtxtime = itd.dt_txt.split(" ")[1];
          var dtxtime = new Date(itd.ts * 1000)
            .toLocaleTimeString()
            .split(":")[0];

          var dtxdate = new Date(itd.ts * 1000).toLocaleDateString();
          console.log(dtxdate);
          var icode = itd.weather.icon;
          if (dtxtime >= time && curdate == dtxdate && i < 4) {
            if (dtxtime > 12) {
              dtxpm = Number(dtxtime) - 12;
            }
            console.log(dtxpm);
            if (dtxpm === 0) {
              console.log(dtxtime);
              console.log(itd.temp);
              i++;

              return (
                <Col xs={3} key={itd.ts}>
                  <img
                    id="wicon"
                    src={`https://www.weatherbit.io/static/img/icons/${icode}.png `}
                    alt="Weather icon"
                  />

                  <h3>{itd.temp}</h3>
                  <h4>{dtxtime}am</h4>
                </Col>
              );
            } else {
              i++;
              return (
                <Col xs={3} key={itd.ts}>
                  <img
                    id="wicon"
                    src={`https://www.weatherbit.io/static/img/icons/${icode}.png `}
                    alt="Weather icon"
                  />

                  <h3>{itd.temp}</h3>
                  <h4>{dtxpm}pm</h4>
                </Col>
              );
            }
          }
        });
        setmyhrarr(mytemhrarr);
        console.log(mytemhrarr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [items]);
  function hourlyfun() {
    setflag2(1);
    var des;
    var temp2;
    var temphrobj = hdetails;
    var icon;
    var mylist = temphrobj.data.map(function (item) {
      iconcode = item.weather.icon;
      des = item.weather.description;
      temp2 = item.temp;
      //var dtxt = item.dt_txt;
      var dtxt = new Date(item.ts * 1000).toLocaleString();
      return (
        <div key={dtxt} className="d-flex justify-content-between">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Row>
                  <Accordion.Toggle eventKey="0">
                    <Col>
                      <h3>{dtxt}</h3>
                    </Col>
                    <Col xs={4}>
                      
                      <img
                        id="wicon2"
                        src={`https://www.weatherbit.io/static/img/icons/${iconcode}.png `}
                        alt="Weather icon"
                      />
                      
                      <h3>{des}</h3>
                      
                    </Col>

                    <Col>
                      <h3>{temp2} C</h3>
                    </Col>
                  </Accordion.Toggle>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="d-flex justify-content-around">
                    <div className="d-flex flex-column">
                      <h4>Relative humidity</h4>
                      <h3>{item.rh}</h3>
                    </div>
                    <div className="d-flex flex-column">
                      <h4>Feels like</h4>
                      <h3>{item.app_temp}</h3>
                    </div>
                    <div className="d-flex flex-column">
                      <h4>wind speed</h4>
                      <h3>{item.wind_spd}</h3>
                    </div>
                  </div>
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

    setmylist(mylist);
  }
  //for (var j=0;j<Mylist.length;j++){
  // if(Mylist[j])
  //}
  console.log(items)
  if (flag2 == 0) {
    return (
      <div className="App">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={hourlyfun}>hourly</Nav.Link>
            <Nav.Link onClick={() => setflag2(0)}>Today</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        <Container fluid>
          <form>
            <input
              type="text"
              onChange={(e) => setname(e.target.value)}
            ></input>
            <Button type="submit" onClick={onSearch}>
              submit
            </Button>
          </form>

          <Today data={items} name={name} flag={flag} myhrarr={myhrarr}></Today>
        </Container>
      </div>
    );
  } else {
    return (
      <div id="mydiv">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={hourlyfun}>hourly</Nav.Link>
            <Nav.Link onClick={() => setflag2(0)}>Today</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        <Container
          fluid
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Col md={6} id="hr">
            {Mylist}
          </Col>
        </Container>
      </div>
    );
  }
}

export default App;
