import React, { FC, useState, useEffect } from "react";

interface IApplicationUpdatedFiveDayForecastWeatherProps {
  lat: number;
  lng: number;
  fiveDayUrl: string;
  setLat: (arg: number) => void;
  setLng: (arg: number) => void;
}

const UpdatedFiveDay: FC<IApplicationUpdatedFiveDayForecastWeatherProps> = ({
  lat,
  lng,
  fiveDayUrl,
  setLat,
  setLng,
}) => {
  const [updatedFiveDayApiUrl, setUpdatedFiveDayApiUrl] = useState<string | "">(
    ""
  );
  const [
    updatedFiveDayWeatherData,
    setUpdatedFiveDayWeatherData,
  ] = useState<FiveDayForecastWeather | null>(null);

  const getData = (fiveDayUrl: string) => {
    console.log(`Update Five dat URL is ${fiveDayUrl}`);
    fetch(fiveDayUrl)
      .then((res) => res.json())
      .then((data) => setUpdatedFiveDayWeatherData(data));
  };

  useEffect(() => {
    getData(fiveDayUrl);
    console.log(fiveDayUrl);
  }, [fiveDayUrl]);

  if (updatedFiveDayWeatherData) {
    console.log(`Five Day: ${JSON.stringify(updatedFiveDayWeatherData)}`);
  }

  return <div></div>;
};

export default UpdatedFiveDay;
