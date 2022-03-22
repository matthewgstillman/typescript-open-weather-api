import React, { FC, useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

interface IApplicationWeatherProps {
  lat: number;
  lng: number;
  url: string;
  setLat: (arg: number) => void;
  setLng: (arg: number) => void;
}

const Weather: FC<IApplicationWeatherProps> = ({
  lat,
  lng,
  url,
  setLat,
  setLng,
}) => {
  const [apiUrl, setApiUrl] = useState<string | "">("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getData = (url: string) => {
    console.log(`URL is ${url}`);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  return (
    <div>
      {weatherData !== null ? (
        <WeatherCard
          name={weatherData.name}
          main={weatherData.main}
          weather={weatherData.weather}
          wind={weatherData.wind}
        />
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Weather;
