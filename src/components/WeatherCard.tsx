import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";

const WeatherCard: FC<WeatherData | null> = ({ name, main, weather, wind }) => {
  return (
    <div>
      <Container fluid className="weatherContainer">
        <Row>
          <Col>
            <br />
            <h2>{name}</h2>
            {/* <h3>{date}</h3> */}
            <hr></hr>
            <h1>{Math.round(main.temp)}ºF</h1>
            {weather[0].description}
            <hr></hr>
            <h3>Wind: {Math.round(wind.speed)} MPH</h3>
            <h3>Humidty: {main.humidity}%</h3>
            <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WeatherCard;
