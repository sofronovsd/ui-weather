import React, { useState } from "react";
import "./App.css";
import { Card, Image, Layout } from "antd";
import Search from "antd/es/input/Search";

const App = () => {
  const [info, setInfo] = useState({
    title: "",
    details: { temp: "", humidity: "", pressure: "", feels_like: "" },
    weather: {
      main: "",
      description: "",
      icon: "",
    },
  });
  const searchWeather = async (value: string) => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    const result = await request.json();
    // @ts-ignore
    const title = `${result.name}, ${result.sys.country}`;
    const details = result.main;
    const weather = result.weather[0];
    console.log(result);
    setInfo({
      title,
      details,
      weather,
    });
  };
  // const searchWeather = async (value: string) => {
  //   const request = await fetch(
  //     `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  //   );
  //   const result = await request.json();
  //   // @ts-ignore
  //   const city = result.city;
  //   const list = result.list;
  //   const temp = list[0].main.temp;
  //   console.log(result);
  //   setInfo({
  //     title: city ? `${city?.country}, ${city?.name}` : "",
  //     temp,
  //   });
  // };

  return (
    <Layout className="layout">
      <Layout.Header>
        <h1 className="logo">UI Weather</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: "2rem" }}>
        <Search placeholder="Input location" onSearch={searchWeather} />
        {info.title && (
          <Card
            title={info.title}
            bordered={false}
            style={{ marginTop: "1rem" }}
          >
            <div style={{ display: "flex" }}>
              <Image
                src={`https://openweathermap.org/img/wn/${info.weather.icon}@2x.png`}
              />
              <div>
                <p>{info.weather.main}</p>
                <p className="description">{info.weather.description}</p>
              </div>
            </div>
            <p>Temperature: {info.details.temp} °C</p>
            <p>Feels like: {info.details.feels_like} °C</p>
            <p>Humidity: {info.details.humidity} %</p>
            <p>Pressure: {info.details.pressure} hPa</p>
          </Card>
        )}
      </Layout.Content>
      <Layout.Footer>
        <div className="footer__text">Made by Semyon Sofronov</div>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
