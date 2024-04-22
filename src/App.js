import './App.css';
import axios from 'axios';
import { useState } from 'react';
import NavComponent from './components/navigationBar';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState('Not Specified');
  const [weather, setWeather] = useState([{ temp: 'Not Available', humidity: 'Not Available' }]);

  const handleLocation = (e) => {
    e.preventDefault();
    if (e.target.value.length >= 4) {

      setLocation(e.target.value);

    }
  }

  const handleLatitude = (e) => {
    e.preventDefault()
    setLatitude(e.target.value);
  }

  const handleLongitude = (e) => {
    e.preventDefault()
    setLongitude(e.target.value);
  }

  const handleClick = () => {
    const lat = latitude;
    const lon = longitude;

    const result = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=7e59edf657214bdbb1c50318242104&q=${location}&days=7&aqi=no&alerts=no`);

    console.log(lat, lon)

    result.then((res) => {

      var weather_data = []

      if (res.data.forecast == null) {
        var temp = "\nTemperature: " + res.data.current.temp_c + "°C\n";
        var humidity = "Humidity: " + res.data.current.humidity + "\n";

        setWeather([{ "temp": temp, "humidity": humidity, condition: res.data.current.condition.text }]);
      }
      else{
        res.data.forecast.forecastday.forEach(e => {
          var date = e.date;
          var max_temp = e.day.maxtemp_c;
          var avg_temp = e.day.avgtemp_c;
          var min_temp = e.day.mintemp_c;

          weather_data.push({date: date, max_temp: max_temp, min_temp: min_temp, avg_temp:avg_temp})
        })
        setWeather(weather_data)
        console.log("ELSE")
      }
    }
    );

  }
  return (
    <div className="App">

      <div className='main-div'>

        {/* <div className="current-result-div" id="current-result">
          <div className='result-bg'></div>
          <div id='stats-div'>
            {
              weather.map(e => {
                console.log(e.temp, e.humidity)
                return (
                  <div className='weather-item'>
                    {e.temp} <br />
                    {e.humidity}
                  </div>
                );
              })

            }
            <div className='title-div' id='title'>

            </div></div>
          <div id='info-div'>Cloudy <br /><br /> Location: {location}</div>
        </div> */}

        <div className="weekly-result-div" id="weekly-result">
          <div className='result-bg'></div>
          <div id='stats-div'>
            {
              weather.map(e => {
                console.log(e.temp, e.humidity)
                return (
                  <div className='weather-item'>
                    {e.date} <br />
                    {e.avg_temp}
                  </div>
                );
              })

            }
            <div className='title-div' id='title'>

            </div></div>
          <div id='info-div'> <br /><br /> Location: {location}</div>
        </div>

        <div className='input-div'>
          <div className='input-bg'></div>
          <NavComponent />
          <input type="text" className='input-group' placeholder="Search by Location" onChange={(e) => handleLocation(e)} /> <br />
          <input type="text" className='input-group' placeholder="Latitude" onChange={(e) => handleLatitude(e)} />
          <input type="text" className='input-group' placeholder="Longitude" onChange={(e) => handleLongitude(e)} /> <br />
          <input type="button" value="Show" onClick={() => handleClick()} />
        </div>


      </div>
    </div>
  );
}

export default App;
