import './App.css';
import axios from 'axios';
import { useState } from 'react';
import NavComponent from './components/navigationBar';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocation] = useState('Not Specified');
  const [weather, setWeather] = useState([{ temp: 'Not Available', humidity: 'Not Available', condition: null }]);
  const [api, setApi] = useState('https://api.weatherapi.com/v1/current.json?key=7e59edf657214bdbb1c50318242104&q=${location}&aqi=no');
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

    var url = null;

    if (latitude == 0 && longitude == 0) {
      url = api.replace("${location}", location);
    }
    else {
      url = api.replace("${location}", `${latitude},${longitude}`);
    }

    const result = axios.get(url);

    console.log(url)

    result.then((res) => {

      var weather_data = []

      if (res.data.forecast == null) {
        var temp = "\nTemperature: " + res.data.current.temp_c + "°C\n";
        var humidity = "Humidity: " + res.data.current.humidity + "\n";
        var place = `${res.data.location.name}, ${res.data.location.region}, ${res.data.location.country}`;

        setWeather([{ location: place, "temp": temp, "humidity": humidity, condition: res.data.current.condition.text }]);
        console.log(location);
        console.log(res.data.location)
      }
      else {
        res.data.forecast.forecastday.forEach(e => {
          var date = e.date;
          var max_temp = e.day.maxtemp_c;
          var avg_temp = e.day.avgtemp_c;
          var min_temp = e.day.mintemp_c;
          var humidity = e.day.avghumidity;
          var place = `${res.data.location.name}, ${res.data.location.region}, ${res.data.location.country}`;

          weather_data.push({ location: place, date: date, max_temp: max_temp, min_temp: min_temp, avg_temp: avg_temp, humidity: humidity })
        })
        setWeather(weather_data);
        // console.log("ELSE")
      }

      var new_display = display;
      new_display[2] = 'flex';
      setDisplay(new_display);
    }
    );

  }

  const buttonCallback = (display, api) => {
    setDisplay(display);
    setApi(api);
    setWeather([{ temp: 'Not Available', humidity: 'Not Available' }]);
    // setLocation('Not Specified');
  }
  return (
    <div className="App">

      <div className='main-div'>

        <div className="current-result-div" id="current-result" style={{ display: display[0] }}>
          <div className='result-bg'></div>
          <div id='current-stats-div'>
            {
              weather.map(e => {
                console.log(e.temp, e.humidity)
                return (
                  <div className='current-weather-item' style={{ display: display[2] }}>
                    <div className='item-layer'></div>
                    <div className='main-weather-div'>
                      {e.temp} <br />
                      {e.humidity}
                    </div>
                  </div>
                );
              })

            }
            <div className='title-div' id='title'>

            </div></div>
          <div id='info-div'>
            {weather[0].condition} <br /><br /> Location: {weather[0].location}</div>
        </div>

        <div className="weekly-result-div" id="weekly-result" style={{ display: display[1] }}>
          <div className='result-bg'></div>
          <div id='stats-div'>
            {
              weather.map(e => {
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
          <div id='info-div'> <br /><br /> Location: {weather[0].location}</div>
        </div>

        <div className='input-div'>
          <div className='input-bg'></div>
          <NavComponent callback={buttonCallback} />
          <input type="text" className='input-group' placeholder="Search by Location" onChange={(e) => handleLocation(e)} /> <br />
          <div className='position-group'>
            <input type="text" className='lat-long' placeholder="Latitude" onChange={(e) => handleLatitude(e)} />
            <input type="text" className='lat-long' placeholder="Longitude" onChange={(e) => handleLongitude(e)} /> <br />
          </div>
          <input type="button" value="Show" onClick={() => handleClick()} />
        </div>


      </div>
    </div>
  );
}

export default App;
