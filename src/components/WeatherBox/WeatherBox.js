import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weather, setWeather] = useState();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setPending(true);
    setError(false);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8faf9294927e1fa058b92a51bad7c3a5&units=metric`)
    .then(res => { 
      if (res.status === 200) {
        return res.json()
        .then(data => {
          setWeather({ city: data.name, temp: Math.round(data.main.temp), icon: data.weather[0].icon, description: data.weather[0].main });
        });
      } else {
        setError(true);
      }
    }); 

    setPending(false);

  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather && !pending && !error && <WeatherSummary {...weather} /> }
      { pending && <Loader /> }
      { error && <ErrorBox>Can't find such city...</ErrorBox> }
    </section>
  )
};

export default WeatherBox;