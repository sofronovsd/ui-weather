import React, { useState } from "react";
import "./App.css";
import { Card, Layout } from "antd";
import Search from "antd/es/input/Search";

const App = () => {
  const [info, setInfo] = useState({ title: "" });
  const searchWeather = async (value: string) => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    const result = await request.json();
    // @ts-ignore
    const city = result.city;
    console.log(result);
    setInfo({
      title: city ? `${city?.country}, ${city?.name}` : "",
    });
  };

  return (
    <Layout className="layout">
      <Layout.Header>
        <h1 className="logo">UI Weather</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: "2rem" }}>
        <Search placeholder="Input location" onSearch={searchWeather} />
        <Card title={info.title} bordered={false} style={{ marginTop: "1rem" }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Layout.Content>
      <Layout.Footer>
        <div className="footer__text">Made by Semyon Sofronov</div>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
