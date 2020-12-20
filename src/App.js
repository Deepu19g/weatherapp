import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./components/sylesheets.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavItem } from "react-bootstrap";

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
    fetch(`${api.base}q=${name}&units=metric`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e5005f9710msh08af91097dd5460p1acaaajsn2fe300cfa360",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setlat(response.coord.lat);
        setlong(response.coord.lon);
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
    fetch(
      `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lat=${late}&lon=${long}&hours=48`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "e5005f9710msh08af91097dd5460p1acaaajsn2fe300cfa360",
          "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        sethdetail(response);
        var i = 0;
        var mytemhrarr = response.data.map(function hrdetail(itd) {
          //var dtxtime = itd.dt_txt.split(" ")[1];
          var dtxtime = new Date(itd.ts * 1000).toLocaleTimeString();
          console.log(dtxtime);
          var dtxdate = new Date(itd.ts * 1000).toLocaleDateString();
          console.log(dtxdate);
          var icode = itd.weather.icon;
          if (dtxtime >= time && curdate == dtxdate && i < 4) {
            console.log(dtxtime);
            console.log(itd.temp);
            i++;
            return (
              <div key={itd.ts}>
                <img
                  id="wicon"
                  src={`https://www.weatherbit.io/static/img/icons/${icode}.png `}
                  alt="Weather icon"
                />
                <h3>{itd.weather.description}</h3>
                <h3>{itd.temp}</h3>
                <h3>{dtxtime}</h3>
              </div>
            );
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
        <Row key={item.ts}>
          <Col sm={4}>
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
          
          <Col >
            <h2>{temp2} C</h2>
          </Col>
          <Col >
            <h2>{item.rh}</h2>
          </Col>
        </Row>
      );
    });

    setmylist(mylist);
  }

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
        <div className="d-flex justify-content-center align-items-center">
          <div id="hr">
            <h2 id="idk2">hourly weather</h2>
            
            {Mylist}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
