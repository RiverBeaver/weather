import React, { useState } from 'react';
import './App.css';
import Weather from './Weather';

function App() {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<{
    temp: number;
    description: string;
  } | null>(null);

  const fetchWeather = () => {
    // const city: string = 'London';
    const APIkey: string = '1ce2c8f1225f14bf33b893989c1548cf';
    // const APIkey: string = '53f6e61006925c5d7a2720244fac537f';
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === '404') {
          setError('City not found');
          setWeather(null);
        } else {
          setWeather({
            temp: json.main.temp,
            description: json.weather[0].description,
          });
          setError(null);
        }
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        setError('An error occurred'); // Общая ошибка на случай других проблем
        setWeather(null);
      });
  };

  return (
    <div className='App'>
      <h1>Weather app</h1>
      <div>
        <input
          value={city}
          type='text'
          onChange={(event) => setCity(event.currentTarget.value)}
        />
        <button onClick={fetchWeather}>Get weather</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {weather && (
        <Weather temp={weather.temp} description={weather.description} />
      )}
    </div>
  );
}

export default App;
