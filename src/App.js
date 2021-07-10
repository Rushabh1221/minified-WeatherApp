import React, {useState} from 'react';

const api = {
  key: "a256a9e1e0cbdb20e5a1d3b575d72fca",
  base: "https://api.openweathermap.org/data/2.5/"
}
 
//Function Component:
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
           setQuery('');
           setWeather(result);
           console.log(result); 
          });
    }
  }

  const dateBuilder = (d) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search Here..."
           value={query}
           onChange={e => setQuery(e.target.value)}
           onKeyPress={search} />
        </div>

      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        
      </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
