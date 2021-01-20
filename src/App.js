import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Col, Container } from "react-bootstrap";
import "./components/sylesheets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

import Today from "./components/Today";
import Daily from "./components/Daily";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudRain, faWind } from "@fortawesome/free-solid-svg-icons";

import Hourly from "./components/Hourly";
import Maps from "./components/Maps";
import Modal from "react-bootstrap/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

library.add(faCloudRain, faWind);

function App() {
  const [tname, settname] = useState(" ");
  const [name, setname] = useState(" ");
  const [items, setItems] = useState({});

  const [hdetails, sethdetail] = useState({});

  const [late, setlat] = useState();
  const [long, setlong] = useState();

  const [show, setShow] = useState(true);
  const [searched, setsearch] = useState(false);

  const handleClose = () => setShow(false);

  function onSearch(e) {
    e.preventDefault();

    
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${tname}&key=438b481d5a99435daccd13ab74b8117b`
    )
      .then((res) => res.json())
      .then((response) => {

        
          for (const obi of response.data) {
            setlat(obi.lat);

            setlong(obi.lon);
          }
          setname(tname);
          setItems(response);
          setsearch(true);
      })

      .catch((err) => {
        console.error(err);
        
        alert("data not found for your request")
        setsearch(false)
      });
    
  }

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${late}&lon=${long}&exclude={minutely,alerts}&units=metric&appid=f294bbf17831f5a084f814e8ead88517`
    )
      .then((res) => res.json())
      .then((response) => {
        sethdetail(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [late, long]);
  function check() {
    if (searched !== true) {
      alert("search for a city first");
    }
  }

  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" sticky="top">
          <Navbar.Brand href="#home"> Weatherly</Navbar.Brand>
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
              <Link to="/map">Map</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/">Today</Link>
            </Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <div className="d-flex justify-content-center">
              <form onSubmit={(e) => onSearch(e)} className="search-form">
                <input
                  type="text"
                  onChange={(e) => settname(e.target.value)}
                  placeholder="Enter the name of city"
                  required
                ></input>
                <Button type="submit" className="submit-button">
                  submit
                </Button>
              </form>
            </div>
            <Container fluid>
              <Today data={items} name={name} hdetails={hdetails}></Today>
            </Container>
          </Route>
          <Route path="/hourly">
            <div id="mydiv">
              <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <Col md={6} id="hr">
                  <Hourly hdetails={hdetails} searched={searched}></Hourly>
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
