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
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

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

  const [show, setShow] = useState(true);
  const [searched, setsearch] = useState(false);
  const [tohour, settohour] = useState();
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
        //console.log(response);

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

  useEffect(() => {
    //fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${name}&key=438b481d5a99435daccd13ab74b8117b&hours=48`)

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${late}&lon=${long}&exclude={minutely,alerts}&units=metric&appid=f294bbf17831f5a084f814e8ead88517`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);

        sethdetail(response);

        //setmyhrarr(mytemhrarr);
        //setmyday(response.daily)
        //console.log(mytemhrarr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [items]);
  function check(){
    if(searched!==true){
      alert("search for a city first");
      
    }
  }
  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto ">
            <Nav.Link>
              <Link to="/hourly" onClick={check}>
                Hourly
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/daily" onClick={check}>
                Daily
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/map" >
                Map
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/" >
                Today
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <div className="d-flex justify-content-center">
              <form onSubmit={(e) => onSearch(e)} className="search-form">
                <input
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="enter the name of city"
                  required
                ></input>
                <Button type="submit" className="submit-button">
                  submit
                </Button>
              </form>
            </div>
            <Container fluid>
              <Today
                data={items}
                name={name}
                //searched={searched}
                hdetails={hdetails}
              ></Today>
            </Container>
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
                  <Daily searched={searched} name={name}></Daily>
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
