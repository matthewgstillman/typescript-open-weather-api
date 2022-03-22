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
  ] = useState<FiveDayWeather | null>(null);

  const getData = (fiveDayUrl: string) => {
    console.log(`Five Day URL is ${fiveDayUrl}`);
    fetch(fiveDayUrl)
      .then((res) => res.json())
      .then((data) => setFiveDayWeatherData(data));
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
    console.log(`Five Day: ${fiveDayWeatherData.list[0].main["temp"]}`);
  }

  return <div></div>;
};

export default FiveDayForecast;
