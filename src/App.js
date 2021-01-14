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
import { faCloudRain, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hourly from "./components/Hourly";
import Maps from "./components/Maps";
import Modal from "react-bootstrap/Modal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

library.add(faCloudRain, faWind);

function App() {
  const [name, setname] = useState(" ");
  //const [IsLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  //const [flag, setflag] = useState(0);
  const [hdetails, sethdetail] = useState({});
 
  const [late, setlat] = useState();
  const [long, setlong] = useState();
  const [Mylist, setmylist] = useState([]);
  //const [myday, setmyday] = useState([]);
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
    //setflag(1);
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
    var time = new Date().toLocaleTimeString().split(":")[0];

    var curdate = new Date().toLocaleDateString();
    console.log(curdate);
    //fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${name}&key=438b481d5a99435daccd13ab74b8117b&hours=48`)

    {/*fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${late}&lon=${long}&exclude={minutely,alerts}&units=metric&appid=f294bbf17831f5a084f814e8ead88517`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        sethdetail(response);
        var i = 0;

        var mytemhrarr = response.hourly.map(function hrdetail(itd) {
          //var dtxtime = itd.dt_txt.split(" ")[1];
          var dtxtime = new Date(itd.dt * 1000)
            .toLocaleTimeString()
            .split(":")[0];
          var dtxpm = 0;
          var dtxdate = new Date(itd.dt * 1000).toLocaleDateString();

          if (
            ((dtxtime >= time && dtxdate == curdate) || dtxdate > curdate) &&
            i < 4
          ) {
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
      });*/}
  }, [items]);

  
  

  function sethr() {
    console.log("reached hrly");

    if (searched === false) {
      alert("Search for a city first");
    } 
  }

  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto ">
            <Link to="/hourly" id="mylink" onClick={sethr}>
              hourly
            </Link>
            <Link to="/daily" id="mylink" >
              Daily
            </Link>
            <Link to="/map" id="mylink">
              Map
            </Link>
            <Link to="/" id="mylink">
              Today
            </Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <form onSubmit={(e) => onSearch(e)}>
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                placeholder="enter the name of city"
                required
              ></input>
              <Button type="submit">submit</Button>
              <Container fluid>
                <Today
                  data={items}
                  name={name}
                  //flag={flag}
                  myhrarr={myhrarr}
                ></Today>
              </Container>
            </form>
          </Route>
          <Route path="/hourly">
            <div id="mydiv">
              <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Col md={6} id="hr">
                  <Hourly hdetails={hdetails}></Hourly>
                </Col>
              </Container>
            </div>
          </Route>
          <Route path="/daily">
            <div id="daily">
              
              <Container
                fluid
                className="d-flex flex-column align-items-center"
              >
                <Col md={7}>
                  <Daily  searched={searched} name={name}></Daily>
                </Col>
              </Container>
            </div>
          </Route>
          <Route path="/map">
            <Maps></Maps>
            <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reminder</Modal.Title>
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
