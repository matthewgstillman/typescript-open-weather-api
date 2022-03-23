import React, { useState, useEffect, FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import "./App.css";
import Weather from "./components/Weather";
import FiveDayForecast from "./components/FiveDayForecast";
import UpdatedFiveDay from "./components/UpdatedFiveDay";

interface Coordinates {
  lat: number;
  lng: number;
}

const App: FC = () => {
  const [coords, setCoords] = useState<{}>({
    lat: 34.134117,
    lng: -118.321495,
  });
  const [lat, setLat] = useState<number>(34.134117);
  const [lng, setLng] = useState<number>(-118.321495);
  const [url, setUrl] = useState<string>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  );
  const [fiveDayUrl, setFiveDayUrl] = useState<string>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,hourly,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  );
  const [updatedFiveDayUrl, setUpdateFiveDayUrl] = useState<string>(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_FIVE_DAY_FORECAST_API_KEY}&q=${lat},${lng}&days=5&aqi=no&alerts=no`
  );
  const [coordsSubmitted, setCoordsSubmitted] = useState<boolean>(false);

  const getPosition = () => {
    if (navigator.geolocation) {
      const userCoords = navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          setAll(position.coords.latitude, position.coords.longitude);
        }
      );
    }
  };

  const setAll = (lat: number, lng: number) => {
    setUrl(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
    );
    setFiveDayUrl(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,hourly,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
    );
    setLat(lat);
    setLng(lng);
    setCoordsSubmitted(true);
  };

  return (
    <div className="App">
      <h1> Weather API</h1>
      <br></br>
      {coordsSubmitted === true ? (
        <div>
          <Button
            className="submitButton"
            onClick={getPosition}
            variant="primary"
            type="submit"
          >
            Refresh My Local Weather
          </Button>
          <br />
          <br />
          <br />
          <Weather
            lat={lat}
            lng={lng}
            url={url}
            setLat={setLat}
            setLng={setLng}
          />
          <FiveDayForecast
            lat={lat}
            lng={lng}
            fiveDayUrl={fiveDayUrl}
            setLat={setLat}
            setLng={setLng}
          />
          {/* <UpdatedFiveDay
            lat={lat}
            lng={lng}
            fiveDayUrl={fiveDayUrl}
            setLat={setLat}
            setLng={setLng}
          /> */}
        </div>
      ) : (
        <div>
          <Button
            className="submitButton"
            onClick={getPosition}
            variant="primary"
            type="submit"
          >
            Get My Local Weather
          </Button>
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default App;
