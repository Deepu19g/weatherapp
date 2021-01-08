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
import Daily from "./components/Daily";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hourly from "./components/Hourly";
import Maps from "./components/Maps";
import Modal from "react-bootstrap/Modal";

library.add(faCloudRain);

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
  const [myday, setmyday] = useState([]);
  var iconcode;
  const api = {
    base2: "https://community-open-weather-map.p.rapidapi.com/forecast?",
    base: "https://community-open-weather-map.p.rapidapi.com/weather?",
    //id: "e5005f9710msh08af91097dd5460p1acaaajsn2fe300cfa360",
  };
  const [myhrarr, setmyhrarr] = useState([]);
  const [show, setShow] = useState(true);
  const [searched, setsearch] = useState(false);
  const handleClose = () => setShow(false);
  function onSearch(e) {
    setflag(1);
    e.preventDefault();
    console.log("reached onserach");
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${name}&key=438b481d5a99435daccd13ab74b8117b`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        for (const obi of response.data) {
          setlat(obi.lat);
          console.log(obi.lat);
          setlong(obi.lon);
        }

        setItems(response);
      })

      .catch((err) => {
        console.error(err);
      });
    setsearch(true);
  }
  console.log(late);

  useEffect(() => {
    var time = new Date().toString().split(" ")[4];

    var curdate = new Date().toLocaleDateString();
    console.log(curdate);
    //fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${name}&key=438b481d5a99435daccd13ab74b8117b&hours=48`)
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${late}&lon=${long}&exclude={minutely,alerts}&units=metric&appid=f294bbf17831f5a084f814e8ead88517`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        sethdetail(response);
        var i = 0;
        var dtxpm = 0;
        var mytemhrarr = response.hourly.map(function hrdetail(itd) {
          //var dtxtime = itd.dt_txt.split(" ")[1];
          var dtxtime = new Date(itd.dt * 1000)
            .toLocaleTimeString()
            .split(":")[0];

          var dtxdate = new Date(itd.dt * 1000).toLocaleDateString();

          if (dtxtime >= time && curdate == dtxdate && i < 4) {
            for (const myobj of itd.weather) {
              var icod = myobj.icon;
            }
            console.log(icod);
            if (dtxtime > 12) {
              dtxpm = Number(dtxtime) - 12;
            }
            console.log(dtxpm);
            if (dtxpm === 0) {
              console.log(dtxtime);
              console.log(itd.temp);
              i++;

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
              i++;
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
        setmyhrarr(mytemhrarr);
        //setmyday(response.daily)
        console.log(mytemhrarr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [items]);

  function setfetch() {
    if (searched !== false) {
      fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=438b481d5a99435daccd13ab74b8117b`
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setmyday(response);
          setflag2(2);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("search for a city first");
    }
  }

  if (flag2 == 2) {
    console.log("reached dayfetch");

    return (
      <div id="daily">
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => sethr()}>hourly</Nav.Link>
            <Nav.Link onClick={() => setflag2(0)}>Today</Nav.Link>
            <Nav.Link onClick={setfetch}>Daily</Nav.Link>
            <Nav.Link onClick={() => setflag2(3)}>Map</Nav.Link>
          </Nav>
        </Navbar>
        <Container fluid className="d-flex flex-column align-items-center">
          <Col md={7}>
            <Daily dayfetch={myday}></Daily>
          </Col>
        </Container>
      </div>
    );
  }
  if (flag2 === 3) {
    return (
      <div>
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => sethr()}>hourly</Nav.Link>
            <Nav.Link onClick={() => setflag2(0)}>Today</Nav.Link>
            <Nav.Link onClick={setfetch}>Daily</Nav.Link>
            <Nav.Link onClick={() => setflag2(3)}>Map</Nav.Link>
          </Nav>
        </Navbar>
        <Maps></Maps>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Double tap on any location on map to know current weather
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  if (flag2 == 0) {
    return (
      <div className="App">
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => sethr()}>hourly</Nav.Link>
            <Nav.Link onClick={() => setflag2(0)}>Today</Nav.Link>
            <Nav.Link onClick={setfetch}>Daily</Nav.Link>
            <Nav.Link onClick={() => setflag2(3)}>Map</Nav.Link>
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
  }
  function sethr() {
    if (searched !== false) {
      return (
        <div id="mydiv">
          <Navbar bg="primary" variant="dark" sticky="top">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => sethr()}>hourly</Nav.Link>
              <Nav.Link onClick={() => setflag2(0)}>Today</Nav.Link>
              <Nav.Link onClick={setfetch}>Daily</Nav.Link>
              <Nav.Link onClick={() => setflag2(3)}>Map</Nav.Link>
            </Nav>
          </Navbar>
          <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Col md={6} id="hr">
              <Hourly hdetails={hdetails}></Hourly>
            </Col>
          </Container>
        </div>
      );
    } else {
      
      alert("Search for a city first");
      
    }
  }
}

export default App;
