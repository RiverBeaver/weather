interface WeatherProps {
  temp: number;
  description: string;
}

const Weather = ({ temp, description }: WeatherProps) => {
  return (
    <div className='weather'>
      <p>Temperature: {temp} °C</p>
      <p>Weather: {description}</p>
    </div>
  );
};

export default Weather;
