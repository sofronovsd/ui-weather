import React, { useCallback, useState } from "react";
import "./App.css";
import { Card, Image, Layout, notification } from "antd";
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

  const openNotification = useCallback(() => {
    notification.open({
      message: "Notification",
      description: "No results were found for your query.",
    });
  }, []);

  const searchWeather = useCallback(
    async (value: string) => {
      try {
        const request = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        const result = await request.json();
        const title = `${result.name}, ${result.sys.country}`;
        const details = result.main;
        const weather = result.weather[0];
        setInfo({
          title,
          details,
          weather,
        });
      } catch (e) {
        openNotification();
      }
    },
    [openNotification]
  );

  return (
    <Layout className="layout">
      <Layout.Header>
        <h1 className="logo">UI Weather</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: "2rem" }}>
        <Search placeholder="Input location" onSearch={searchWeather} />
        {info.title ? (
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
            <p>
              Temperature: {Math.ceil(Number.parseInt(info.details.temp))} °C
            </p>
            <p>
              Feels like: {Math.ceil(Number.parseInt(info.details.feels_like))}{" "}
              °C
            </p>
            <p>Humidity: {info.details.humidity} %</p>
            <p>Pressure: {info.details.pressure} hPa</p>
          </Card>
        ) : (
          <Card style={{ marginTop: "1rem" }}>
            <p>Please, input a location to see the current weather</p>
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
