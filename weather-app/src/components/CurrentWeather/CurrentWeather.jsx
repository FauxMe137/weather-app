import './CurrentWeather.css';

function CurrentWeather({location, temperature, condition, temperatureUnit, weatherIcon, feelsLike, details, sunrise, sunset}){
    const displayedTemperature = temperatureUnit === "C" ? temperature : Math.round(((temperature * 9)/5 + 32) * 10)/10;

    const displayedFeelsLike = temperatureUnit === "C" ? feelsLike : Math.round(((feelsLike * 9)/5 + 32) * 10)/10;

    function formatLocalTime(time){
        if(!time) return '—';

        const [hours, minutes] = time.slice(11, 16).split(":").map(Number);

        const period = hours >= 12 ? "PM" : "AM";
        const hour12 = hours % 12 || 12;

        return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
    };

    return (
        <section className="current-weather">
            <div className="current-weather-main">
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
                    <span className="material-symbols-rounded"> {weatherIcon}</span>
                </div>
            </div>
            
            <div className="weather-details">
                <div className="weather-details-grid">
                    {details.map((detail) => (
                        <article className="weather-detail-card" key={detail.id}>
                            <div className="detail-card-heading">
                                <span className="material-symbols-rounded">{detail.icon}</span>
                                <h3>{detail.label}</h3>
                            </div>

                            <p className="detail-card-value">{detail.value}</p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="sun-times">
                <div className="sun-time sunrise">
                    <span className="material-symbols-rounded">wb_twilight</span>
                    <div>
                        <h3>Sunrise</h3>
                        <p>{formatLocalTime(sunrise)}</p>
                    </div>
                </div>

                <div className="sun-time sunset">
                    <span className="material-symbols-rounded">wb_twilight</span>
                    <div>
                        <h3>Sunset</h3>
                        <p>{formatLocalTime(sunset)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;