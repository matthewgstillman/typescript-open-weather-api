import React, { FC, useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

interface IApplicationFiveDayForecastWeatherProps {
  lat: number;
  lng: number;
  fiveDayUrl: string;
  setLat: (arg: number) => void;
  setLng: (arg: number) => void;
}

const FiveDayForecast: FC<IApplicationFiveDayForecastWeatherProps> = ({
  lat,
  lng,
  fiveDayUrl,
  setLat,
  setLng,
}) => {
  const [fiveDayApiUrl, setFiveDayApiUrl] = useState<string | "">("");
  const [
    fiveDayWeatherData,
    setFiveDayWeatherData,
  ] = useState<NewFiveDay | null>(null);
  const [fiveDayWeatherStringArray, setFiveDayWeatherStringArray] = useState<
    string[] | ""
  >("");

  const getData = (fiveDayUrl: string) => {
    console.log(`Five Day URL is ${fiveDayUrl}`);
    fetch(fiveDayUrl)
      .then((res) => res.json())
      // .then((data) => setFiveDayWeatherData(data))
      // .then(function)
      .then(function (data) {
        const fdayArray: string[] = [];
        data.daily.forEach(
          (
            value: {
              dt: number;
              weather: [
                { id: number; main: string; description: string; icon: string }
              ];
              temp: {
                day: number;
                night: number;
                eve: number;
                morn: number;
              };
            },
            index: number
          ) => {
            if (index > 0) {
              let dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
                weekday: "long",
              });
              if (value.weather !== undefined) {
                let icon = value.weather[0].icon;
              }
              if (value.temp !== undefined) {
                let temp = value.temp.day.toFixed(0);
              }
              const fday = `<div class="forecast-day">
              <p>${dayname}</p>
              <div class="forecast-day--temp">${value.temp}<sup>°C</sup></div>
            </div>`;
              fdayArray.push(fday);
            }
          },
          setFiveDayWeatherStringArray(fdayArray)
        );
        console.log(fiveDayWeatherStringArray);
      });
  };

  useEffect(() => {
    getData(fiveDayUrl);
    console.log(fiveDayUrl);
  }, [fiveDayUrl]);

  const convertUnixDate = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);
    return date;
  };

  if (fiveDayWeatherData) {
    console.log(`Five Day: ${JSON.stringify(fiveDayWeatherData)}`);
  }

  return <div></div>;
};

export default FiveDayForecast;
