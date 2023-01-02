import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "1975552d54d6e3e267a168f2ec221e87";
// http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44
function App() {
  const [state, setState] = useState({
    tempreature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  });

  const getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`
    );
    const data = await api.json();

    if (city && country) {
      setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      setState({
        tempreature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "PLease Enter Data...",
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="form_container">
        <Form getWeather={getWeather} />
        <Weather
          tempreature={state.tempreature}
          city={state.city}
          country={state.country}
          humidity={state.humidity}
          description={state.description}
          error={state.error}
        />
      </div>
    </div>
  );
}

export default App;
