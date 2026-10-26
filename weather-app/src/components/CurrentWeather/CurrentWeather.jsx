import './CurrentWeather.css';

function CurrentWeather({location, temperature, condition, temperatureUnit, weatherIcon, feelsLike}){
    const displayedTemperature = temperatureUnit === "C" ? temperature : Math.round(((temperature * 9)/5 + 32) * 10)/10;

    const displayedFeelsLike = temperatureUnit === "C" ? feelsLike : Math.round(((feelsLike * 9)/5 + 32) * 10)/10;

    return (
        <section className="current-weather">
            <div className="current-weather-info">
                <p className="section-label">CURRENT WEATHER</p>
                <h1>{location}</h1>
                <p className="weather-condition">{condition}</p>
                <p className="current-temperature">
                    {displayedTemperature}
                    <span>°{temperatureUnit}</span>
                </p>
                <p className="feels-like">
                    Feels like {displayedFeelsLike}
                    <span>°{temperatureUnit}</span>
                </p>
            </div>

            <div className="current-weather-icon" aria-hidden="true">
                <span className="material-symbols-rounded">{weatherIcon}</span>
            </div>
        </section>
    );
};

export default CurrentWeather;