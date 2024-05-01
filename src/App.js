import './App.css';
import axios from 'axios';
import { useState } from 'react';
import NavComponent from './components/navigationBar';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState('Not Specified');
  const [currentWeather, setCurrentWeather] = useState([{ temp: 'Not Available', humidity: 'Not Available', condition: null }]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [api, setApi] = useState(['https://api.weatherapi.com/v1/current.json?key=7e59edf657214bdbb1c50318242104&q=${location}&aqi=no', 'https://api.weatherapi.com/v1/forecast.json?key=7e59edf657214bdbb1c50318242104&q=${location}&days=7&aqi=no&alerts=no']);
  const [display, setDisplay] = useState(['flex', 'none', 'none']);

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

    var currentUrl = api[0];
    var weeklyUrl = api[1];

    if (latitude == 0 && longitude == 0) {
      currentUrl = currentUrl.replace("${location}", location);
      weeklyUrl = weeklyUrl.replace("${location}", location);
    }
    else {
      currentUrl = currentUrl.replace("${location}", `${latitude},${longitude}`);
      weeklyUrl = weeklyUrl.replace("${location}", `${latitude},${longitude}`);
    }

    const currentResult = axios.get(currentUrl);
    const weeklyResult = axios.get(weeklyUrl);

    // console.log(url)

    currentResult.then((res) => {
      var temp = "\nTemperature: " + res.data.current.temp_c + "°C\n";
      var humidity = "Humidity: " + res.data.current.humidity + "%\n";
      var place = `${res.data.location.name}, ${res.data.location.region}, ${res.data.location.country}`;
      var wind = "Wind Speed: " + res.data.current.wind_kph + " km/h";

      setCurrentWeather([{ location: place, "temp": temp, "humidity": humidity, condition: res.data.current.condition.text, wind: wind }]);
    });

    weeklyResult.then((res) => {

      var weather_data = []

      res.data.forecast.forecastday.forEach(e => {
        var date = e.date;
        var max_temp = e.day.maxtemp_c;
        var avg_temp = e.day.avgtemp_c;
        var min_temp = e.day.mintemp_c;
        var humidity = e.day.avghumidity;
        var place = `${res.data.location.name}, ${res.data.location.region}, ${res.data.location.country}`;

        weather_data.push({ location: place, date: date, max_temp: max_temp, min_temp: min_temp, avg_temp: avg_temp, humidity: humidity })
      });
      setWeeklyWeather(weather_data);
    });


    var new_display = display;
    new_display[2] = 'flex';
    setDisplay(new_display);
  }

  const buttonCallback = (display) => {
    setDisplay(display);
    // setCurrentWeather([{ temp: 'Not Available', humidity: 'Not Available' }]);
    // setLocation('Not Specified');
  }
  return (
    <div className="App">

      <div className='main-div'>

        <div className="current-result-div" id="current-result" style={{ display: display[0] }}>
          <div className='result-bg'></div>
          <div id='current-stats-div'>
            {
              currentWeather.map(e => {
                console.log(e.temp, e.humidity)
                return (
                  <div className='current-weather-item' style={{ display: display[2] }}>
                    <div className='item-layer'></div>
                    <div className='main-weather-div'>
                      {e.temp} <br />
                      {e.humidity} <br/>
                      {e.wind}
                    </div>
                  </div>
                );
              })

            }
            <div className='title-div' id='title'>

            </div></div>
          <div id='info-div'>
            {currentWeather[0].condition} <br /><br /> Location: {currentWeather[0].location}</div>
        </div>

        <div className="weekly-result-div" id="weekly-result" style={{ display: display[1] }}>
          <div className='result-bg'></div>
          <div id='stats-div'>
            {
              weeklyWeather.map(e => {
                console.log(e.temp, e.humidity)
                return (
                  <div className='weather-item' style={{ display: display[2] }}>
                    <div className='item-layer'></div>
                    <div className='main-weather-div'>
                      <div className='date-div'>{e.date}</div> <br />
                      <div className='weather-div'>Avg Temp: {e.avg_temp}°C <br /> Max Temp: {e.max_temp}°C <br /> Min Temp: {e.min_temp}°C <br /> Humidity: {e.humidity}</div>
                    </div>
                  </div>
                );
              })

            }
            <div className='title-div' id='title'>

            </div></div>
          <div id='info-div'> <br /><br /> Location: {currentWeather[0].location}</div>
        </div>

        <div className='input-div'>
          <div className='input-bg'></div>
          <NavComponent callback={buttonCallback} />
          <input type="text" className='input-group' placeholder="Search by Location" onChange={(e) => handleLocation(e)} /> <br />
          <div className='position-group'>
            <input type="text" className='lat-long' placeholder="Lat" onChange={(e) => handleLatitude(e)} />
            <input type="text" className='lat-long' placeholder="Lon" onChange={(e) => handleLongitude(e)} /> <br />
          </div>
          <input type="button" value="Show" onClick={() => handleClick()} />
        </div>


      </div>
    </div>
  );
}

export default App;
